import { login, register, getUserById, updateUser } from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleVerify.js";
import { getConnection } from "../config/database.js";

export const loginController = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const result = await login(data)
        // return res.status(200).json({ message: 'Success', data: result });
        const row = result[0];

        if (result.length > 0) { //jika email benar 
            const match = await bcrypt.compare(data.password, row.password);
            if (match) {// jika password benar
                // daftarkan token 
                const payload = { email: row.email };
                const token = jwt.sign(payload, '***003TOKEN', { expiresIn: '1day' });
                res.status(200).json({ message: 'Login Success', id: row.id, fullname: row.fullname, email: row.email, success: true, token: token });
            } else { //jika password salah
                return res.status(400).json({
                    message: 'Password Salah',
                    success: false
                });
            }
        } else { //email salah 
            return res.status(400).json({ essage: 'Email Salah', success: false });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const registerController = async (req, res) => {
    const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    try {
        await register(data)
        return res.status(200).json({
            message: 'Berhasil mendaftar, silahkan login',
            data: data,
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;

        const googleUser = await verifyGoogleToken(token);

        const db = await getConnection();

        // cek user di database
        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [googleUser.email]
        );

        let user;

        if (users.length === 0) {
            const [result] = await db.execute(
                "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
                [googleUser.name, googleUser.email, ""]
            );

            user = {
                id: result.insertId,
                fullname: googleUser.name,
                email: googleUser.email,
            };
        } else {
            user = users[0];
        }

        // buat JWT kamu sendiri
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            success: true,
            user,
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Google auth failed",
        });
    }
};

export const getUserController = async (req, res) => {
    try {

        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        return res.json({
            success: true,
            data: user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const updateUserController = async (req, res) => {
  try {

    let hashedPassword = null;

    if (req.body.password) {
      hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    const data = {
      id: req.params.id,
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      photo: req.file
        ? req.file.filename
        : null,
    };

    await updateUser(data);

    return res.json({
      success: true,
      message: "Profil berhasil diperbarui",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};