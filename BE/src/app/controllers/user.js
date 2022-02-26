const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserController = {
  register: async (req, res) => {
    try {
      const data = req.body;
      // hash mật khẩu
      const hashPassword = await bcrypt.hash(data.password, 12);
      data.password = hashPassword;
      const newUser = await userModel.create(data);
      // Tạo token để truy duy trì đăng nhập
      const token = createAccessToken({
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      });
      return res.send({ success: true, data: newUser, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const data = req.body;
      const user = await userModel.findOne({ email: data.email });
      // tìm người dùng
      if (!user)
        return res
          .status(500)
          .send({ success: false, message: "Không tìm thấy" });
      const checkPass = await bcrypt.compareSync(data.password, user.password); // true
      // Kiểm tra mật khẩu
      if (!checkPass)
        return res
          .status(500)
          .send({ success: false, message: "Mật khẩu chưa đúng" });
      // Tạo token
      const token = createAccessToken({
        id: user._id,
        name: user.name,
        role: user.role,
      });
      return res.send({ success: true, data: user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  list: async (req, res) => {
    try {
      const list = await userModel.find({});
      // Đếm để phân trang
      const count = await userModel.countDocuments();
      return res.send({ success: true, data: list, count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.status(500).send({ success: false, message: "Không có id" });
      // Tìm user
      const user = await userModel.findOne({ _id: id }).select("-password");
      if (!user)
        return res
          .status(500)
          .send({ success: false, message: "Không tồn tại user" });
      return res.send({ success: true, data: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.status(500).send({ success: false, message: "Không có id" });
      const rs = await userModel.findOneAndDelete({ _id: id });
      return res.send({ success: true, message: "Xoá user thành công" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.status(500).send({ success: false, message: "Không có id" });
      const data = req.body;
      if (data.password) {
        const hashPassword = await bcrypt.hash(data.password, 12);
        data.password = hashPassword;
      }
      const rs = await userModel.findByIdAndUpdate(id, data, { new: true });
      if (!rs)
        return res
          .status(500)
          .send({ success: false, message: "Cập nhật không thành công" });
      return res.send({
        success: true,
        message: "Cập nhập thành công",
        data: rs,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  // Tạo token hạn 7 ngày
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = UserController;
