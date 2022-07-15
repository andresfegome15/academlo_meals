const express = require("express");

const mealRouter = express.Router();

//validators
const {
  mealsCreateValidator,
  mealsUpdateValidator,
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
  mealExist,
} = require("../middlewares/testExist.middleware");

//controller
const {
  getmeal,
  createMeal,
  getMealById,
  deleteMeal,
  updateMeal,
} = require("../controller/meal.controller");

mealRouter.get("/", getmeal);
mealRouter.get("/:id", mealExist, getMealById);

mealRouter.use(seccionproteted, isAdmin);
mealRouter.post("/:id", restaurantExist, mealsCreateValidator, createMeal);
mealRouter
  .use("/:id", mealExist)
  .route("/:id")
  .patch(mealsUpdateValidator, updateMeal)
  .delete(deleteMeal);

module.exports = { mealRouter };
