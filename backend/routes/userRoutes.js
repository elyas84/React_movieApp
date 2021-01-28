const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const inputValidator = require("../middleware/validator");

router.route("/register").post(inputValidator, userController.new);

router.route("/login").post(inputValidator, userController.login);

router.route("/profile").get(protect, userController.profile);

module.exports = router;
