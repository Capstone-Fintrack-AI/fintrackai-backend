import { getConnection } from "../config/database.js";

// TOTAL PEMASUKAN
export const getTotalPemasukan = async (
  userId
) => {
  const db = await getConnection();

  const [rows] = await db.query(
    `
    SELECT
      COALESCE(SUM(jumlah),0)
      AS total_pemasukan
    FROM pemasukan
    WHERE user_id = ?
    `,
    [userId]
  );

  return rows[0];
};

// TOTAL PENGELUARAN
export const getTotalPengeluaran =
  async (userId) => {
    const db =
      await getConnection();

    const [rows] =
      await db.query(
        `
        SELECT
          COALESCE(SUM(jumlah),0)
          AS total_pengeluaran
        FROM pengeluaran
        WHERE user_id = ?
        `,
        [userId]
      );

    return rows[0];
  };

//   UNTUK TOTAL 7 HARI PENGELUARAN BY ID
export const getPengeluaran7Hari =
  async (userId) => {
    const db =
      await getConnection();

    const [rows] =
      await db.query(
        `
        SELECT
          tanggal,
          SUM(jumlah)
          AS total_keluar
        FROM pengeluaran
        WHERE user_id = ?
        GROUP BY tanggal
        ORDER BY tanggal DESC
        LIMIT 7
        `,
        [userId]
      );

    return rows;
  };

// target tabungan aktif
export const getActiveTargetTabungan =
  async (userId) => {
    const db =
      await getConnection();

    const [rows] =
      await db.query(
        `
        SELECT *
        FROM target_tabungan
        WHERE user_id = ?
        AND status = 'proses'
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [userId]
      );

    return rows[0];
  };