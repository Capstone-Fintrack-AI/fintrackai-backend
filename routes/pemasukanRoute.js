import express from "express";

import {
    createPemasukan,
    getAllPemasukan,
    getPemasukanById,
    updatePemasukan,
    deletePemasukan,
    getPemasukanByUserId
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



export default router;