const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");


//Register

exports.new = async (req, res) => {
  // see if user exisis

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { name, email, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User alreday exsits" }],
      });
    }

    user = new User({
      name,
      email,
      password,
      isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.save();
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: 3600,
      });
    };
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error: " + error,
    });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: 360000, // Dont forget set it back to 2 mins
      });
    };
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password, please correct it",
    });
  }
};

// private
exports.profile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};
