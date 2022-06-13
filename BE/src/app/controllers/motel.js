const motelModel = require("../models/motel");
const path = require("path");
const imageModel = require("../models/images");

const motelCtr = {
  // Tạo bài viết
  create: async (req, res) => {
    try {
      const data = req.body;
      // khai báo mảng chứa _id hình ảnh
      let arrImg = null;
      // kiểm tra xem có file upload hình ảnh xuống không
      if (req.files?.images) {
        let file = req.files.images;
        // kiểm tra xem file là array hay object để lưu
        // Khi upload nhiều ảnh thì trả về array còn 1 ảnh thì object nên check để lưu
        if (Array.isArray(file)) {
          // Dùng promise all vì lặp qua hình ảnh để lưu vào db trả về promise
          arrImg = await Promise.all(
            file.map(async (img) => {
              // cấu trúc đường dẫn upload cho thư mục
              let name = Date.now() + img.name;
              let url = path.join(__dirname, "../../../");
              let uploadPath = url + "uploads/" + name;
              // lưu hình ảnh lên folder uploads
              img.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
              });
              let imgUrl = "http://localhost:3008/images/" + name;
              // lưu đường dẫn hình ảnh vào db
              let createImg = await imageModel.create({ name: imgUrl });
              return createImg._id;
            })
          );
        } else {
          let url = path.join(__dirname, "../../../");
          let name = Date.now() + file.name;
          let uploadPath = url + "uploads/" + name;
          file.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
          });
          let imgUrl = "http://localhost:3008/images/" + name;
          let createImg = await imageModel.create({ name: imgUrl });
          arrImg = [createImg._id];
        }
      }
      // gán mảng id hình ảnh vào
      data.images = arrImg;
      const rs = await motelModel.create(data);
      return res.send({ success: true, data: rs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  // Lấy danh sách bài viết
  list: async (req, res) => {
    try {
      const { skip, limit } = req.query;
      // filter {category || district || areaFrom && areaTo || }
      const { search, sort, filter } = req.body;
      let condition = {};
      // check điều kiện
      if (search) {
        // Tìm theo regex không phân biệt chữ hoa và thường
        let searchRg = new RegExp(`.*${search}.*`, "i");
        // cú pháp tìm theo regex mongo
        condition["$or"] = [
          // Tìm theo tiêu đề của bài viết
          { title: searchRg },
        ];
      }

      if (filter) {
        // Kiểm tra có loại bài viết
        if (filter.category) {
          condition.category = filter.category;
        }
        // kiểm tra xem thuộc vùng nào
        if (filter.district) {
          condition.district = filter.district;
        }
        // kiểm tra diện tích trong khoảng
        if (filter.areaTo && filter.areaFrom) {
          condition.area = {
            $gte: Number(filter.areaFrom),
            $lte: Number(filter.areaTo),
          };
        }
        // kiểm tra giá tiền trong khoảng
        if (filter.priceTo && filter.priceFrom) {
          condition.price = {
            $gte: Number(filter.priceFrom),
            $lte: Number(filter.priceTo),
          };
        }
        // kiểm tra khoảng thời gian tạo
        if (filter.timeTo && filter.timeFrom) {
          condition.created_time = {
            $gte: filter.timeFrom,
            $lte: filter.timeTo,
          };
        }
        // kiểm tra hạn
        if (filter.approved != undefined) {
          condition.approved = filter.approved;
        }
      }
      // Tìm bài viết theo điều kiện
      const list = await motelModel
        .find(condition)
        .populate("category")
        .populate("district")
        .populate("author")
        .populate("images")
        .sort(sort || { created_time: -1 })
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 10);
      // Đếm tổng số bài viết để phân trang
      const count = await motelModel.countDocuments(condition);
      return res.send({ success: true, data: list, count: count });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  // lấy 1 bài viết
  get: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(500).send({ success: false, message: "Không có id" });
      const rs = await motelModel.findById(id).populate("category").populate("district").populate("author").populate("images");
      return res.send({ success: true, data: rs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  // Xoá 1 bài viết
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(500).send({ success: false, message: "Không có id" });
      const rs = await motelModel.findByIdAndDelete(id);
      return res.send({ success: true, data: rs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      if (!id) return res.status(500).send({ success: false, message: "Không có id" });
      const rs = await motelModel.findByIdAndUpdate(id, data, { new: true });
      return res.send({ success: true, data: rs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  // tìm kiếm trọ
  search: async (req, res) => {
    try {
      const search = req.body.data;
      let rs = {};
      if (search.district) {
        rs = await motelModel.find({ district: search.district }).populate("category").populate("district").populate("author").populate("images");
      }
      if (search.type) {
        rs = await motelModel.find({ category: search.type }).populate("category").populate("district").populate("author").populate("images");
      }
      if (search.price) {
        if (search.price == 1) {
          rs = await motelModel
            .find({ price: { $lte: 1000000 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.price == 2) {
          rs = await motelModel
            .find({ price: { $gte: 1000000, $lte: 1500000 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.price == 3) {
          rs = await motelModel
            .find({ price: { $gte: 1500000, $lte: 2000000 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.price == 4) {
          rs = await motelModel
            .find({ price: { $gte: 2000000 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
      }
      if (search.area) {
        if (search.area == 1) {
          rs = await motelModel
            .find({ area: { $lte: 10 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.area == 2) {
          rs = await motelModel
            .find({ area: { $gte: 10, $lte: 15 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.area == 3) {
          rs = await motelModel
            .find({ area: { $gte: 15, $lte: 20 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
        if (search.area == 4) {
          rs = await motelModel
            .find({ area: { $gte: 20 } })
            .populate("category")
            .populate("district")
            .populate("author")
            .populate("images");
        }
      }
      if (rs.length == 0) {
        return res.send({ success: false, message: "Không tìm thấy kết quả nào!" });
      }
      return res.send({ success: true, data: rs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },
};

module.exports = motelCtr;
