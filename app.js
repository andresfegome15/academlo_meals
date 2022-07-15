const express = require("express");

const app = express();

//util json
app.use(express.json());

//middlewares
const { ErrorHandler } = require("./middlewares/handlerError.middleware");

//Routers
const { userRouter } = require("./routes/user.router");
const { restaurantRouter } = require("./routes/restaurant.roter");
const { mealRouter } = require("./routes/meal.router");
const { orderRouter } = require("./routes/order.router");

//utils
const { GlobalError } = require("./utils/GlobalError.utils");

//Endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

//endpoint no found
app.all("*", (req, res, next) => {
  next(
    new GlobalError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(ErrorHandler);
module.exports = { app };
