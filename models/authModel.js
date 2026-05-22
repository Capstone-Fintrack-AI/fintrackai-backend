import { getConnection } from "../config/database.js";

export const login = async (data) => {
    const db = await getConnection()
    const [result] = await db.query(`SELECT * FROM users WHERE email = '${data.email}'`);

    return result;
}

export const register = async (data) => {
    const db = await getConnection();
    await db.query (`INSERT INTO users(fullname, email, password)VALUES('${data.fullname}', '${data.email}', '${data.password}')`);

    return true;
}