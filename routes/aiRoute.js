import express from "express";

import {
  predictSpend,
} from "../controllers/aiController.js";

const router =
  express.Router();

router.get(
  "/ai/predict-spend/:user_id",
  predictSpend
);

export default router;