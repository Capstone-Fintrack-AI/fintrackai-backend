import express from 'express';

import {
  createTarget,
  getTargetsByUser,
  getTarget,
  updateTarget,
  deleteTarget
} from '../controllers/targetTabunganController.js';

const router = express.Router();

// CREATE
router.post('/', createTarget);

// GET ALL TARGET USER
router.get('/user/:user_id', getTargetsByUser);

// GET TARGET BY ID
router.get('/:id', getTarget);

// UPDATE
router.put('/:id', updateTarget);

// DELETE
router.delete('/:id', deleteTarget);

export default router;