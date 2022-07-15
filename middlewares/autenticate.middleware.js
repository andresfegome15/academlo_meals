//libreriry
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//models
const { User } = require("../models/user.models");

//Utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyinc } = require("../utils/catchAsync.utils");

const seccionproteted = catchAsyinc(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new GlobalError("seccion invalid", 403));
  }

  const decode = await JWT.verify(token, process.env.CRYPTO);

  const user = await User.findOne({
    where: { id: decode.id, status: "active" },
  });

  if (!user) {
    return next(new GlobalError("user is not enabled"));
  }

  req.seccionUser = user;
  next();
});

const uservalidated = (req, res, next) => {
  const { seccionUser, user } = req;

  if (seccionUser.id !== user.id) {
    return next(new GlobalError("this no is your account", 403));
  }

  next();
};

const uservalidatedOrder = (req, res, next) => {
  const { seccionUser } = req;

  if (seccionUser.id !== user.id) {
    return next(new GlobalError("this no is your account", 403));
  }

  next();
};

module.exports = { seccionproteted, uservalidated };
