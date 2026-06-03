import { getConnection } from "../config/database.js";

export const login = async (data) => {
    const db = await getConnection()
    const [result] = await db.query(`SELECT * FROM users WHERE email = '${data.email}'`);

    return result;
}

export const register = async (data) => {
    const db = await getConnection();
    await db.query(`INSERT INTO users(fullname, email, password)VALUES('${data.fullname}', '${data.email}', '${data.password}')`);

    return true;
}

export const getUserById = async (id) => {
    const db = await getConnection();

    const [rows] = await db.execute(
        "SELECT id, fullname, email, photo FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

export const updateUser = async (data) => {
    const db = await getConnection();

    let query = `
      UPDATE users
      SET fullname = ?, email = ?
  `;

    const params = [
        data.fullname,
        data.email,
    ];

    if (data.password) {
        query += `, password = ?`;
        params.push(data.password);
    }

    if (data.photo) {
        query += `, photo = ?`;
        params.push(data.photo);
    }

    query += ` WHERE id = ?`;

    params.push(data.id);

    const [result] = await db.execute(query, params);

    return result;
};