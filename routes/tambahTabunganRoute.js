import express from "express";

import {
  tambahDana,
  predictTabungan,
  getTotalTabunganById,
} from "../controllers/tambahTabunganController.js";

const router = express.Router();

// tambah dana
router.post(
  "/tabungan/:id/tambah-dana",
  tambahDana
);

// prediction AI
router.get(
  "/tabungan/:id/predict",
  predictTabungan
);

router.get(
  "/tabungan/:id/total",
  getTotalTabunganById
);

export default router;