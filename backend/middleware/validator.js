const { check } = require("express-validator");

const inputValidator = [
  check("name", "Name is required!").not().isEmpty().bail(),
  check("email", "Please, include a valid email!").isEmail().bail(),
  check("password", "Password is required!").isLength({ min: 5 }).bail(),
];

module.exports = inputValidator;
