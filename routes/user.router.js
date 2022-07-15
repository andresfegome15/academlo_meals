const express = require("express");

const userRouter = express.Router();

//middlewares
const { userValidator, loginValidator } = require("../middlewares/validators");
const {
  seccionproteted,
  uservalidated,
} = require("../middlewares/autenticate.middleware");
const { userExit, orderExist } = require("../middlewares/testExist.middleware");

//controller
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getOrdersUser,
  getOrderUserByID,
} = require("../controller/user.controller");

userRouter.post("/", userValidator, createUser);
userRouter.post("/login", loginValidator, login);

userRouter.use(seccionproteted);
userRouter.get("/orders", getOrdersUser);
userRouter.get("/orders/:id", orderExist, getOrderUserByID);

userRouter
  .use("/:id", userExit)
  .route("/:id")
  .patch(uservalidated, updateUser)
  .delete(uservalidated, deleteUser);

module.exports = { userRouter };
