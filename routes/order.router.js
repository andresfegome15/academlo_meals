const express = require("express");

const orderRouter = express.Router();

//middlewares

//validators
const { orderCreateValidator } = require("../middlewares/validators");

//account protetion
const {
  seccionproteted,
  uservalidated,
} = require("../middlewares/autenticate.middleware");

//testing exist
const { isNormal, orderExist } = require("../middlewares/testExist.middleware");

//controller
const {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

orderRouter.use(seccionproteted, isNormal);
orderRouter.get("/me", getOrder);
orderRouter.post("/", orderCreateValidator, createOrder);

orderRouter
  .use("/:id", orderExist)
  .route("/:id")
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = { orderRouter };
