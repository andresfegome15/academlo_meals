const { body, validationResult } = require("express-validator");
const { GlobalError } = require("../utils/GlobalError.utils");

const result = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map(err => err.msg);

    const message = errorMsgs.join(". ");

    return next(new GlobalError(message, 400));
  }

  next();
};

const userValidator = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .isEmail()
    .withMessage("format not valid email")
    .notEmpty()
    .withMessage("email cannot be null"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password min 8 character")
    .isAlphanumeric()
    .withMessage("Password contain letters and numbers"),
  body("role").notEmpty().withMessage("role is't null"),
  result,
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email cannot be null")
    .isEmail()
    .withMessage("email dont hav formato email"),
  body("password")
    .isAlphanumeric()
    .withMessage("password is alphanumeric")
    .isLength({ min: 8 })
    .withMessage("password contain min 8 character long"),
  result,
];

const restaurantValidator = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("address").notEmpty().withMessage("address cannot be null"),
  body("rating")
    .isInt()
    .withMessage("Rating only can be integer")
    .notEmpty()
    .withMessage("Rating cannot be null"),
  result,
];

const restaurantupdateValidator = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("address").notEmpty().withMessage("Rating cannot be null"),
  result,
];

const reviewCreateValidator = [
  body("comment").notEmpty().withMessage("comment cannot be null"),
  body("rating")
    .isInt()
    .withMessage("Rating only can be integer")
    .notEmpty()
    .withMessage("rating cannot be null"),
  result,
];

const reviewUpdateValidator = [
  body("comment").notEmpty().withMessage("comment cannot be null"),
  body("rating")
    .isInt()
    .withMessage("Rating only can be integer")
    .notEmpty()
    .withMessage("rating cannot be null"),
  result,
];

const mealsCreateValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("price")
    .isInt()
    .withMessage("price only can be integer")
    .notEmpty()
    .withMessage("price cannot be null"),
  result,
];

const mealsUpdateValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("price")
    .isInt()
    .withMessage("price only can be integer")
    .notEmpty()
    .withMessage("price cannot be null"),
  result,
];

const orderCreateValidator = [
  body("mealId")
    .notEmpty()
    .withMessage("mealId cannot be null")
    .isInt()
    .withMessage("mealId only can be integer"),
  body("quantity")
    .isInt()
    .withMessage("quantity only can be integer")
    .notEmpty()
    .withMessage("quantity cannot be null"),
  result,
];

module.exports = {
  userValidator,
  loginValidator,
  restaurantValidator,
  restaurantupdateValidator,
  reviewCreateValidator,
  reviewUpdateValidator,
  mealsCreateValidator,
  mealsUpdateValidator,
  orderCreateValidator,
};
