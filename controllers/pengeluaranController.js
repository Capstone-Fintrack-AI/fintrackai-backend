import {
  getAllPengeluaranModel,
  getPengeluaranByUserIdModel,
  getTotalPengeluaranModel,
  createPengeluaranModel,
  updatePengeluaranModel,
  deletePengeluaranModel
} from '../models/pengeluaranModel.js';

// GET semua pengeluaran
export const getAllPengeluaran = async (req, res) => {

  try {

    const result = await getAllPengeluaranModel();

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// GET pengeluaran by user id
export const getPengeluaranByUserId = async (req, res) => {

  try {

    const { user_id } = req.params;

    const result = await getPengeluaranByUserIdModel(user_id);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// GET total pengeluaran by user id
export const getTotalPengeluaran = async (req, res) => {

  try {

    const { user_id } = req.params;

    const result = await getTotalPengeluaranModel(user_id);

    res.status(200).json({
      success: true,
      total_pengeluaran: result[0].total_pengeluaran || 0
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// CREATE pengeluaran
export const createPengeluaran = async (req, res) => {

  try {

    await createPengeluaranModel(req.body);

    res.status(201).json({
      success: true,
      message: 'Pengeluaran berhasil ditambahkan'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// UPDATE pengeluaran
export const updatePengeluaran = async (req, res) => {

  try {

    const { id } = req.params;

    await updatePengeluaranModel(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Pengeluaran berhasil diupdate'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// DELETE pengeluaran
export const deletePengeluaran = async (req, res) => {

  try {

    const { id } = req.params;

    await deletePengeluaranModel(id);

    res.status(200).json({
      success: true,
      message: 'Pengeluaran berhasil dihapus'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

