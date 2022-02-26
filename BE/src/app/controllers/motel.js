const motelModel = require("../models/motel")

const motelCtr = {
    // Tạo bài viết
    create: async (req, res) => {
        try {
            const data = req.body
            const rs = await motelModel.create(data)
            return res.send({success: true, data: data})
        } catch (error) {
            console.error(error)
            return res.status(500).send({success: false, message: error.message})
        }
    },
    // Lấy danh sách bài viết
    list: async (req, res) => {
        try {
            const { skip, limit } = req.query
            // filter {category || district || areaFrom && areaTo || }
            const {search, sort, filter} = req.body
            let condition = {}
            // check điều kiện
            if(search) {
                // Tìm theo regex không phân biệt chữ hoa và thường
                let searchRg = new RegExp(`.*${search}.*`, 'i')
                // cú pháp tìm theo regex mongo
                condition["$or"] = [
                    // Tìm theo tiêu đề của bài viết
                    {title: searchRg}
                ]
            }

            if(filter) {
                // Kiểm tra có loại bài viết
                if(filter.category) {
                    condition.category = filter.category
                }
                // kiểm tra xem thuộc vùng nào
                if(filter.district) {
                    condition.district = filter.district
                }
                // kiểm tra diện tích trong khoảng
                if(filter.areaTo && filter.areaFrom) {
                    condition.area = {
                        $gte: Number(filter.areaFrom),
                        $lte: Number(filter.areaTo)
                    }
                }
                // kiểm tra giá tiền trong khoảng
                if(filter.priceTo && filter.priceFrom) {
                    condition.price = {
                        $gte: Number(filter.priceFrom),
                        $lte: Number(filter.priceTo)
                    }
                }
                // kiểm tra khoảng thời gian tạo
                if(filter.timeTo && filter.timeFrom) {
                    condition.created_time = {
                        $gte: filter.timeFrom,
                        $lte: filter.timeTo
                    }
                }
                // kiểm tra hạn 
                if(filter.approved != undefined) {
                    condition.approved = filter.approved
                }
            }
            // Tìm bài viết theo điều kiện
            const list = await motelModel.find(condition)
                                        .sort(sort || {created_time: -1})
                                        .skip(Number(skip) || 0)
                                        .limit(Number(limit) || 10)
            // Đếm tổng số bài viết để phân trang                           
            const count = await motelModel.countDocuments(condition)
            return res.send({success: true, data: list, count: count})
        } catch (error) {
            console.error(error)
            return res.status(500).send({success: false, message: error.message})
        }
    },
    // lấy 1 bài viết
    get: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) return res.status(500).send({success: false, message: "Không có id"})
            const rs = await motelModel.findById(id)
            return res.send({success: true, data: rs})
        } catch (error) {
            console.error(error)
            return res.status(500).send({success: false, message: error.message})
        }
    },
    // Xoá 1 bài viết
    delete: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) return res.status(500).send({success: false, message: "Không có id"})
            const rs = await motelModel.findByIdAndDelete(id)
            return res.send({success: true, data: rs})
        } catch (error) {
            console.error(error)
            return res.status(500).send({success: false, message: error.message})
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            if(!id) return res.status(500).send({success: false, message: "Không có id"})
            const rs = await motelModel.findByIdAndUpdate(id, data, {new: true})
            return res.send({success: true, data: rs})
        } catch (error) {
            console.error(error)
            return res.status(500).send({success: false, message: error.message})
        }
    }
}

module.exports = motelCtr