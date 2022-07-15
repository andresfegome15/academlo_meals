//models
const { Meals } = require("../models/meals.models");
const { Restaurant } = require("../models/restaurant.models");

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyinc } = require("../utils/catchAsync.utils");

const getmeal = catchAsyinc(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: { status: "active" },
    include: [{ model: Restaurant }],
  });
  res.status(200).json({ status: "success", meals });
});

const getMealById = catchAsyinc(async (req, res, next) => {
  const { meal } = req;
  res.status(200).json({ status: "success", meal });
});

const createMeal = catchAsyinc(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const meal = await Meals.create({ name, price, restaurantId: id });
  res.status(201).json({ meal });
});

const updateMeal = catchAsyinc(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;
  await meal.update({ name, price });
  res.status(201).json({ meal });
});

const deleteMeal = catchAsyinc(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: "inactive" });
  res.status(201).json({ status: "success" });
});

module.exports = { getmeal, getMealById, createMeal, updateMeal, deleteMeal };
