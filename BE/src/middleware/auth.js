const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = header && header.split(" ")[1];

    if (!token)
      return res.status(401).send({ success: false, message: "Xác thực thất bại" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, id) => {
      if (error)
        return res.status(401).send({ success: false, message: "Xác thực không hợp lệ" });
      req.id = id;
      next();
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = auth;
