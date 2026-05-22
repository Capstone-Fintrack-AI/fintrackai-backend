import {
    createPemasukanModel,
    getAllPemasukanModel,
    getPemasukanByIdModel,
    updatePemasukanModel,
    deletePemasukanModel,
    getPemasukanByUserIdModel,
} from "../models/pemasukanModel.js";

// CREATE
export const createPemasukan = async (req, res) => {
    try {

        const data = {
            user_id: req.body.user_id,
            nama_pemasukan: req.body.nama_pemasukan,
            sumber_pemasukan: req.body.sumber_pemasukan,
            jumlah: req.body.jumlah
        };

        // VALIDASI
        if (!data.user_id || !data.nama_pemasukan || !data.jumlah) {
            return res.status(400).json({
                message: "Data wajib diisi"
            });
        }

        const result = await createPemasukanModel(data);

        res.status(201).json({
            message: "Pemasukan berhasil ditambahkan",
            data: result,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// READ ALL
export const getAllPemasukan = async (req, res) => {
    try {

        const result = await getAllPemasukanModel();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// READ BY ID
export const getPemasukanById = async (req, res) => {
    try {

        const result = await getPemasukanByIdModel(req.params.id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: result[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// UPDATE
export const updatePemasukan = async (req, res) => {
    try {

        const data = {
            user_id: req.body.user_id,
            nama_pemasukan: req.body.nama_pemasukan,
            sumber_pemasukan: req.body.sumber_pemasukan,
            jumlah: req.body.jumlah
        };

        const result = await updatePemasukanModel(
            req.params.id,
            data
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pemasukan berhasil diupdate"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE
export const deletePemasukan = async (req, res) => {
    try {

        const result = await deletePemasukanModel(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pemasukan berhasil dihapus"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// pemasukan by id
export const getPemasukanByUserId = async (req, res) => {
    try {

        const result = await getPemasukanByUserIdModel(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};