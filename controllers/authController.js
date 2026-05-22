import { login, register } from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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