const districtModel = require('../models/district')

const districtController = {
    get: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id)
              return res.status(500).send({ success: false, message: "Không có id" });
            const rs = await districtModel.findById(id)
            return res.send({success: true, data: rs})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    list: async (req, res) => {
        try {
            const rs = await districtModel.find({})
            return res.send({success: true, data: rs})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    create: async (req, res) => {
        try {
            const data = req.body
            const rs = await districtModel.create(data)
            return res.send({success: true, data: rs})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            if (!id) return res.status(500).send({ success: false, message: "Không có id" });
            const update = await CATEGORIES.findByIdAndUpdate(id, data, {new: true})
            if(!update)
                return res.status(500).send({success: false, message: "Sửa thất bại"})
            return res.send({success: true, message: "Sửa thành công", data: update})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) return res.status(500).send({ success: false, message: "Không có id" });
            const rs = await districtModel.findByIdAndDelete(id)
            return res.send({success: true, message: "Xoá thành công"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

module.exports = districtController