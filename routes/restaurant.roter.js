const express = require("express");

const restaurantRouter = express.Router();

//middlewares

//validators
const {
  restaurantValidator,
  reviewUpdateValidator,
  restaurantupdateValidator,
  reviewCreateValidator,
} = require("../middlewares/validators");

//account protetion
const {
  seccionproteted,
  uservalidated,
} = require("../middlewares/autenticate.middleware");

//testing exist
const {
  isAdmin,
  restaurantExist,
  reviewValited,
} = require("../middlewares/testExist.middleware");

//controller
const {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
  getRestaurantById,
} = require("../controller/restaurant.controller");

restaurantRouter.get("/", getRestaurant);
restaurantRouter.get("/:id", restaurantExist, getRestaurantById);

restaurantRouter.use(seccionproteted);
restaurantRouter.post(
  "/reviews/:restaurantId",
  restaurantExist,
  reviewCreateValidator,
  createReview
);
restaurantRouter.patch(
  "/reviews/:id",
  reviewValited,
  reviewUpdateValidator,
  updateReview
);
restaurantRouter.delete("/reviews/:id", reviewValited, deleteReview);

restaurantRouter.use(isAdmin);
restaurantRouter.post("/", restaurantValidator, createRestaurant);
restaurantRouter
  .use("/:id", restaurantExist)
  .route("/:id")
  .patch(restaurantupdateValidator, updateRestaurant)
  .delete(deleteRestaurant);

module.exports = { restaurantRouter };
