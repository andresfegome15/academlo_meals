//models
const { Restaurant } = require("../models/restaurant.models");
const { Review } = require("../models/reviews.models");

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyinc } = require("../utils/catchAsync.utils");

const getRestaurant = catchAsyinc(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    include: [{ model: Review }],
    where: { status: "active" },
  });
  res.status(200).json({ restaurant });
});

const getRestaurantById = catchAsyinc(async (req, res, next) => {
  const { restaurant } = req;
  const rest = await Restaurant.findOne({
    include: [{ model: Review }],
    where: { id: restaurant.id },
  });
  res.status(200).json({ rest });
});

const createRestaurant = catchAsyinc(async (req, res, next) => {
  const { name, address, rating } = req.body;
  const restaurant = await Restaurant.create({ name, address, rating });
  res.status(200).json({ status: "success", restaurant });
});

const updateRestaurant = catchAsyinc(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });
  res.status(201).json({ status: "success", restaurant });
});

const deleteRestaurant = catchAsyinc(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "inactive" });
  res.status(201).json({ status: "success" });
});

const createReview = catchAsyinc(async (req, res, next) => {
  const { seccionUser, restaurant } = req;
  const { comment, rating } = req.body;

  const review = await Review.create({
    userId: seccionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });
  res.status(201).json({ status: "succes", review });
});

const updateReview = catchAsyinc(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  await review.update({ comment, rating });
  res.status(203).json({ status: "success", review });
});

const deleteReview = catchAsyinc(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: "inactive" });
  res.status(203).json({ status: "success", review });
});

module.exports = {
  getRestaurant,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
