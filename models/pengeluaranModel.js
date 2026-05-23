import { getConnection } from '../config/database.js';

// GET semua pengeluaran
export const getAllPengeluaranModel = async () => {

  const db = await getConnection();

  const [rows] = await db.execute(
    'SELECT * FROM pengeluaran ORDER BY created_at DESC'
  );

  return rows;
};

// GET pengeluaran by user id
export const getPengeluaranByUserIdModel = async (user_id) => {

  const db = await getConnection();

  const [rows] = await db.execute(
    'SELECT * FROM pengeluaran WHERE user_id = ? ORDER BY created_at DESC',
    [user_id]
  );

  return rows;
};

// GET total pengeluaran by user id
export const getTotalPengeluaranModel = async (user_id) => {

  const db = await getConnection();

  const [rows] = await db.execute(
    `SELECT SUM(jumlah) AS total_pengeluaran 
     FROM pengeluaran 
     WHERE user_id = ?`,
    [user_id]
  );

  return rows;
};

// CREATE pengeluaran
export const createPengeluaranModel = async (data) => {

  const db = await getConnection();

  const [result] = await db.execute(
    `INSERT INTO pengeluaran
    (user_id, nama_pengeluaran, kategori, jumlah, tanggal)
    VALUES (?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.nama_pengeluaran,
      data.kategori,
      data.jumlah,
      data.tanggal
    ]
  );

  return result;
};

// UPDATE pengeluaran
export const updatePengeluaranModel = async (id, data) => {

  const db = await getConnection();

  const [result] = await db.execute(
    `UPDATE pengeluaran
     SET nama_pengeluaran = ?,
         kategori = ?,
         jumlah = ?,
         tanggal = ?
     WHERE id = ?`,
    [
      data.nama_pengeluaran,
      data.kategori,
      data.jumlah,
      data.tanggal,
      id
    ]
  );

  return result;
};

// DELETE pengeluaran
export const deletePengeluaranModel = async (id) => {

  const db = await getConnection();

  const [result] = await db.execute(
    'DELETE FROM pengeluaran WHERE id = ?',
    [id]
  );

  return result;
};