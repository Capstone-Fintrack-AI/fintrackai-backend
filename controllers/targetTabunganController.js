import {
  createTargetTabungan,
  getTargetByUserId,
  getTargetById,
  updateTargetTabungan,
  deleteTargetTabungan
} from '../models/targetTabunganModel.js';


// CREATE
export const createTarget = async (req, res) => {
  try {

    const result = await createTargetTabungan(req.body);

    res.status(201).json({
      success: true,
      message: 'Target tabungan berhasil dibuat',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET BY USER ID
export const getTargetsByUser = async (req, res) => {
  try {

    const result = await getTargetByUserId(req.params.user_id);

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


// GET BY ID
export const getTarget = async (req, res) => {
  try {

    const result = await getTargetById(req.params.id);

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


// UPDATE
export const updateTarget = async (req, res) => {
  try {

    const result = await updateTargetTabungan(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Target berhasil diupdate',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE
export const deleteTarget = async (req, res) => {
  try {

    const result = await deleteTargetTabungan(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Target berhasil dihapus',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};