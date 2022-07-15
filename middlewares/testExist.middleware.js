//models
const { User } = require("../models/user.models");
const { Order } = require("../models/order.models");
const { Restaurant } = require("../models/restaurant.models");
const { Review } = require("../models/reviews.models");
const { Meals } = require("../models/meals.models");

//utils
const { catchAsyinc } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/GlobalError.utils");

const userExit = catchAsyinc(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new GlobalError("user no found", 400));
  }

  req.user = user;
  next();
});

const orderExist = catchAsyinc(async (req, res, next) => {
  const { id } = req.params;
  const { seccionUser } = req;

  const order = await Order.findOne({ where: { id, status: "active" } });
  if (!order) {
    return next(new GlobalError("Order no found", 404));
  }
  if (order.userId !== seccionUser.id) {
    return next(new GlobalError("User cannot perform this operation", 404));
  }

  req.order = order;
  next();
});

const restaurantExist = catchAsyinc(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  let idSelecte;
  if (id !== undefined) {
    idSelecte = id;
  } else {
    idSelecte = restaurantId;
  }

  const restaurant = await Restaurant.findOne({
    where: { id: idSelecte, status: "active" },
  });
  if (!restaurant) {
    return next(new GlobalError("Restaurant no found"));
  }
  req.restaurant = restaurant;
  next();
});

const isAdmin = catchAsyinc(async (req, res, next) => {
  const { seccionUser } = req;
  if (seccionUser.role !== "admin") {
    return next(new GlobalError("User cannot perform this operation", 404));
  }
  req.seccionUser = seccionUser;
  next();
});

const isNormal = catchAsyinc(async (req, res, next) => {
  const { seccionUser } = req;
  if (seccionUser.role === "admin") {
    return next(new GlobalError("User cannot perform this operation", 404));
  }
  req.seccionUser = seccionUser;
  next();
});

const reviewValited = catchAsyinc(async (req, res, next) => {
  const { id } = req.params;
  const { seccionUser } = req;
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    return next(new GlobalError("Review no found", 404));
  }
  if (seccionUser.id !== review.userId) {
    return next("Review does not belong to this user");
  }
  req.review = review;
  next();
});

const mealExist = catchAsyinc(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meals.findOne({ where: { id, status: "active" } });

  if (!meal) {
    return next(new GlobalError("Meal no found or is inactive"));
  }
  req.meal = meal;
  next();
});

module.exports = {
  userExit,
  orderExist,
  isAdmin,
  restaurantExist,
  reviewValited,
  mealExist,
  isNormal,
};
