import { getConnection } from "../config/database.js";

// ambil target berdasarkan id
export const getTargetById = async (id) => {
  const db = await getConnection();

  const [rows] = await db.query(
    `
    SELECT *
    FROM target_tabungan
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

// insert histori tabungan
export const insertDetailTabungan = async (
  target_tabungan_id,
  nominal
) => {
  const db = await getConnection();

  return await db.query(
    `
    INSERT INTO detail_tabungan
    (target_tabungan_id, nominal)
    VALUES (?, ?)
    `,
    [target_tabungan_id, nominal]
  );
};

// update jumlah terkumpul
export const updateJumlahTerkumpul = async (
  id,
  jumlah_terkumpul,
  status
) => {
  const db = await getConnection();

  return await db.query(
    `
    UPDATE target_tabungan
    SET jumlah_terkumpul = ?,
        status = ?,
        updated_at = NOW()
    WHERE id = ?
    `,
    [jumlah_terkumpul, status, id]
  );
};

// ambil 3 histori terakhir
export const getLastThreeSavings = async (
  target_tabungan_id
) => {
  const db = await getConnection();

  const [rows] = await db.query(
    `
    SELECT nominal
    FROM detail_tabungan
    WHERE target_tabungan_id = ?
    ORDER BY created_at DESC
    LIMIT 3
    `,
    [target_tabungan_id]
  );

  return rows;
};
