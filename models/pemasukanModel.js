import { getConnection } from "../config/database.js";

// CREATE
export const createPemasukanModel = async (data) => {
    const pool = await getConnection();

    const query = `
        INSERT INTO pemasukan
        (user_id, nama_pemasukan, sumber_pemasukan, jumlah)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        data.user_id,
        data.nama_pemasukan,
        data.sumber_pemasukan,
        data.jumlah
    ];

    const [result] = await pool.execute(query, values);

    return result;
};

// READ ALL
export const getAllPemasukanModel = async () => {
    const pool = await getConnection();

    const query = `SELECT * FROM pemasukan`;

    const [rows] = await pool.execute(query);

    return rows;
};

// READ BY ID
export const getPemasukanByIdModel = async (id) => {
    const pool = await getConnection();

    const query = `
        SELECT * FROM pemasukan
        WHERE id = ?
    `;

    const [rows] = await pool.execute(query, [id]);

    return rows;
};

// UPDATE
export const updatePemasukanModel = async (id, data) => {
    const pool = await getConnection();

    const query = `
        UPDATE pemasukan
        SET
            user_id = ?,
            nama_pemasukan = ?,
            sumber_pemasukan = ?,
            jumlah = ?
        WHERE id = ?
    `;

    const values = [
        data.user_id,
        data.nama_pemasukan,
        data.sumber_pemasukan,
        data.jumlah,
        id
    ];

    const [result] = await pool.execute(query, values);

    return result;
};

// DELETE
export const deletePemasukanModel = async (id) => {
    const pool = await getConnection();

    const query = `
        DELETE FROM pemasukan
        WHERE id = ?
    `;

    const [result] = await pool.execute(query, [id]);

    return result;
};

// untuk total pemasukan
export const getPemasukanByUserIdModel = async (user_id) => {

    const pool = await getConnection();

    const query = `
        SELECT * FROM pemasukan
        WHERE user_id = ?
    `;

    const [rows] = await pool.execute(query, [user_id]);

    return rows;
};