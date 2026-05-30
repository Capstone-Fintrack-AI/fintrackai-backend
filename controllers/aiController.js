import axios from "axios";

import {
  getTotalPemasukan,
  getTotalPengeluaran,
  getPengeluaran7Hari,
  getActiveTargetTabungan,
} from "../models/aiModel.js";

export const predictSpend =
  async (req, res) => {
    try {

      const { user_id } =
        req.params;

      // ======================
      // TOTAL PEMASUKAN
      // ======================

      const pemasukan =
        await getTotalPemasukan(
          user_id
        );

      // ======================
      // TOTAL PENGELUARAN
      // ======================

      const pengeluaran =
        await getTotalPengeluaran(
          user_id
        );

      // ======================
      // SALDO SAAT INI
      // ======================

      const saldoSaatIni =
        Number(
          pemasukan.total_pemasukan || 0
        ) -
        Number(
          pengeluaran.total_pengeluaran || 0
        );

      // ======================
      // TARGET TABUNGAN
      // ======================

      const targetTabungan =
        await getActiveTargetTabungan(
          user_id
        );

      // ======================
      // HISTORI PENGELUARAN
      // ======================

      const histories =
        await getPengeluaran7Hari(
          user_id
        );

      let spendHistory =
        histories.map((item) => ({
          saldo_awal_harian:
            saldoSaatIni +
            Number(
              item.total_keluar || 0
            ),

          total_keluar:
            Number(
              item.total_keluar || 0
            ),

          saldo_akhir_harian:
            saldoSaatIni,
        }));

      // ======================
      // WAJIB 7 DATA
      // ======================

      while (
        spendHistory.length < 7
      ) {
        spendHistory.push({
          saldo_awal_harian: 0,
          total_keluar: 0,
          saldo_akhir_harian: 0,
        });
      }

      spendHistory =
        spendHistory.slice(0, 7);

      // ======================
      // PAYLOAD AI
      // ======================

      const payload = {
        spend_history:
          spendHistory,
      };

      console.log(
        "===== PAYLOAD AI ====="
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      // ======================
      // REQUEST AI
      // ======================

      const response =
        await axios.post(
          "https://luxamrown-fintrack-model-fastapi.hf.space/predict/spend",
          payload
        );

      const prediksiPengeluaran =
        Number(
          response.data
            .predict_spend || 0
        );

      const estimasiSaldoBesok =
        saldoSaatIni -
        prediksiPengeluaran;

      // ======================
      // INSIGHT PENGELUARAN
      // ======================

      let insight = "";

      if (
        prediksiPengeluaran >
        saldoSaatIni * 0.5
      ) {
        insight =
          "Pengeluaran besok diperkirakan cukup tinggi dibanding saldo yang tersedia.";
      }
      else if (
        prediksiPengeluaran >
        saldoSaatIni * 0.3
      ) {
        insight =
          "Perhatikan pengeluaran Anda karena nilainya cukup besar.";
      }
      else {
        insight =
          "Pengeluaran besok diperkirakan masih dalam batas aman.";
      }

      // ======================
      // INSIGHT TABUNGAN
      // ======================

      let targetInsight =
        null;

      if (
        targetTabungan
      ) {

        const sisaTarget =
          Number(
            targetTabungan.jumlah_target
          ) -
          Number(
            targetTabungan.jumlah_terkumpul
          );

        if (
          estimasiSaldoBesok >
          sisaTarget * 0.1
        ) {

          targetInsight = {
            nama_target:
              targetTabungan.nama_target,

            status:
              "sesuai_jadwal",

            pesan:
              `Jika pola pengeluaran tetap terjaga, target tabungan ${targetTabungan.nama_target} dapat tercapai sesuai jadwal.`,
          };

        } else {

          targetInsight = {
            nama_target:
              targetTabungan.nama_target,

            status:
              "terancam",

            pesan:
              `Pengeluaran yang diprediksi dapat memperlambat pencapaian target tabungan ${targetTabungan.nama_target}.`,
          };

        }
      }

      // ======================
      // RESPONSE
      // ======================

      return res.json({
        success: true,

        saldo_saat_ini:
          saldoSaatIni,

        prediksi_pengeluaran_besok:
          prediksiPengeluaran,

        estimasi_saldo_besok:
          estimasiSaldoBesok,

        insight,

        target_tabungan:
          targetInsight,
      });

    } catch (error) {

      console.log(
        "===== AI ERROR ====="
      );

      console.log(
        error.response?.data ||
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
        ai_error:
          error.response?.data ||
          null,
      });
    }
  };