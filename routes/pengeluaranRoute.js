import express from 'express';

import {
  getAllPengeluaran,
  getPengeluaranByUserId,
  getTotalPengeluaran,
  createPengeluaran,
  updatePengeluaran,
  deletePengeluaran
} from '../controllers/pengeluaranController.js';

const router = express.Router();

// GET semua pengeluaran
router.get('/', getAllPengeluaran);

// GET pengeluaran by user id
router.get('/user/:user_id', getPengeluaranByUserId);

// GET total pengeluaran
router.get('/total/:user_id', getTotalPengeluaran);

// CREATE
router.post('/create', createPengeluaran);

// UPDATE
router.put('/update/:id', updatePengeluaran);

// DELETE
router.delete('/delete/:id', deletePengeluaran);

export default router;