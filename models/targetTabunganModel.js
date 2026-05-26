import { getConnection } from '../config/database.js';


// CREATE TARGET
export const createTargetTabungan = async (data) => {
  const db = await getConnection();

  const query = `
    INSERT INTO target_tabungan
    (user_id, nama_target, jumlah_target, jumlah_terkumpul, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    data.user_id,
    data.nama_target,
    data.jumlah_target,
    data.jumlah_terkumpul || 0,
    data.status || 'proses'
  ];

  const [result] = await db.execute(query, values);

  return result;
};


// GET ALL TARGET BY USER ID
export const getTargetByUserId = async (user_id) => {
  const db = await getConnection();

  const [rows] = await db.execute(
    `SELECT * FROM target_tabungan WHERE user_id = ? ORDER BY created_at DESC`,
    [user_id]
  );

  return rows;
};


// GET TARGET BY ID
export const getTargetById = async (id) => {
  const db = await getConnection();

  const [rows] = await db.execute(
    `SELECT * FROM target_tabungan WHERE id = ?`,
    [id]
  );

  return rows;
};


// UPDATE TARGET
export const updateTargetTabungan = async (id, data) => {
  const db = await getConnection();

  const query = `
    UPDATE target_tabungan
    SET
      nama_target = ?,
      jumlah_target = ?,
      jumlah_terkumpul = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    data.nama_target,
    data.jumlah_target,
    data.jumlah_terkumpul,
    data.status,
    id
  ];

  const [result] = await db.execute(query, values);

  return result;
};


// DELETE TARGET
export const deleteTargetTabungan = async (id) => {
  const db = await getConnection();

  const [result] = await db.execute(
    `DELETE FROM target_tabungan WHERE id = ?`,
    [id]
  );

  return result;
};