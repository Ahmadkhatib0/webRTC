const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const joi = require("joi");
const validators = require("express-joi-validation").createValidator({});

const registerSchema = joi.object({
  username: joi.string().min(3).max(12).required(),
  password: joi.string().min(6).max(12).required(),
  mail: joi.string().email().required(),
});

const loginSchema = joi.object({
  password: joi.string().min(6).max(12).required(),
  mail: joi.string().email().required(),
});
router.post(
  "/register",
  validators.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validators.body(loginSchema),
  authControllers.controllers.postLogin
);

module.exports = router;
