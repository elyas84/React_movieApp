const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      // console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "You have to Login or Sign up",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "No token passed ",
    });
  }
};


module.exports = { protect };
