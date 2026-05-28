import axios from "axios";

import {
  getTargetById,
  insertDetailTabungan,
  updateJumlahTerkumpul,
  getLastThreeSavings,
} from "../models/tambahTabunganModel.js";

// tambah dana
export const tambahDana = async (req, res) => {
  try {
    const { id } = req.params;
    const { nominal } = req.body;

    // cek target tabungan
    const target = await getTargetById(id);

    if (!target) {
      return res.status(404).json({
        success: false,
        message: "Target tabungan tidak ditemukan",
      });
    }

    // insert histori tabungan
    await insertDetailTabungan(
      id,
      nominal
    );

    // hitung jumlah terbaru
    const jumlahBaru =
      Number(target.jumlah_terkumpul) +
      Number(nominal);

    // status target
    let status = "proses";

    if (
      jumlahBaru >=
      Number(target.jumlah_target)
    ) {
      status = "selesai";
    }

    // update target
    await updateJumlahTerkumpul(
      id,
      jumlahBaru,
      status
    );

    return res.json({
      success: true,
      message: "Dana berhasil ditambahkan",
      data: {
        jumlah_terkumpul: jumlahBaru,
        status,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// prediction AI
export const predictTabungan = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ambil target
    const target =
      await getTargetById(id);

    if (!target) {
      return res.status(404).json({
        success: false,
        message: "Target tabungan tidak ditemukan",
      });
    }

    // ambil histori terakhir
    const histori =
      await getLastThreeSavings(id);

    // ubah ke array angka
    let nabungTerakhir =
      histori.map((item) =>
        Number(item.nominal)
      );

    // wajib 3 item
    while (
      nabungTerakhir.length < 3
    ) {
      nabungTerakhir.push(0);
    }

    // rata-rata tabungan
    const nabungHarian =
      nabungTerakhir.reduce(
        (a, b) => a + b,
        0
      ) / 3;

    // payload AI
    const payload = {
      jumlah_target: Number(
        target.jumlah_target
      ),

      jumlah_terkumpul: Number(
        target.jumlah_terkumpul
      ),

      nabung_harian:
        Math.round(nabungHarian),

      nabung_terakhir:
        nabungTerakhir,
    };

    // request AI
    const aiResult =
      await axios.post(
        "https://luxamrown-fintrack-model-fastapi.hf.space/predict/savings",
        payload
      );

    return res.json({
      success: true,
      prediction: aiResult.data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
