//models
const { Meals } = require("./meals.models");
const { User } = require("./user.models");
const { Restaurant } = require("./restaurant.models");
const { Review } = require("./reviews.models");
const { Order } = require("./order.models");

const modelsRelations = () => {
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurant);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  Meals.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meals);
};

module.exports = { modelsRelations };
