const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const joi = require("joi");
const validators = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

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

// test route to verify that middleware is working
router.get("/test-token", auth, (req, res) => {
  res.send("request has been passed ");
});
module.exports = router;
