//models
const { Order } = require("../models/order.models");
const { Meals } = require("../models/meals.models");
const { Restaurant } = require("../models/restaurant.models");

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyinc } = require("../utils/catchAsync.utils");

const getOrder = catchAsyinc(async (req, res, next) => {
  const { seccionUser } = req;
  const order = await Order.findAll({
    where: { userId: seccionUser.id },
    include: [{ model: Meals, include: [{ model: Restaurant }] }],
  });
  res.status(200).json({ order });
});

const createOrder = catchAsyinc(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { seccionUser } = req;
  const meal = await Meals.findOne({ where: { id: mealId, status: "active" } });
  if (!meal) {
    return next(new GlobalError("Meal no found", 404));
  }

  let totalPrice = quantity * meal.price;

  const order = await Order.create({
    mealId,
    userId: seccionUser.id,
    totalPrice,
    quantity,
  });
  res.status(201).json({ order });
});

const updateOrder = catchAsyinc(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: "completed" });
  res.status(201).json({ status: "success" });
});

const deleteOrder = catchAsyinc(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: "cancelled" });
  res.status(201).json({ status: "success" });
});

module.exports = { getOrder, createOrder, updateOrder, deleteOrder };
