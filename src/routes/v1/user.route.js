const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");
const passport = require("passport");

const router = express.Router();

const getUserValidation = validate(userValidation.getUser);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`

// router.get("/:userId?q", auth ,getUserValidation, userController.getUser);

router.get("/:userId", auth ,getUserValidation, userController.getUser); 

router.put("/:userId", auth, validate(userValidation.setAddress),userController.setAddress);

module.exports = router;
