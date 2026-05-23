import express from "express";

import {
    createPemasukan,
    getAllPemasukan,
    getPemasukanById,
    updatePemasukan,
    deletePemasukan,
    getPemasukanByUserId,
    getTotalPemasukan
} from "../controllers/pemasukanController.js";

const router = express.Router();

// CREATE
router.post("/", createPemasukan);

// READ ALL
router.get("/", getAllPemasukan);

// PEMASUKAN BY USER ID
router.get("/user/:id", getPemasukanByUserId);

// READ BY ID
router.get("/:id", getPemasukanById);

// UPDATE
router.put("/:id", updatePemasukan);

// DELETE
router.delete("/:id", deletePemasukan);

// GET total pemasukan
router.get('/total/:user_id', getTotalPemasukan);



export default router;