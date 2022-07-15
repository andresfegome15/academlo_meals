//libreri
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// models
const { User } = require("../models/user.models");
const { Order } = require("../models/order.models");

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyinc } = require("../utils/catchAsync.utils");

const createUser = catchAsyinc(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //passwoord bcryp
  const salt = await bcrypt.genSalt(12);
  const incryPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: incryPassword,
    role,
  });
  user.password = undefined;
  res.status(201).json({ status: "user created", user });
});

const login = catchAsyinc(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new GlobalError("Credential invalid", 400));
  }

  const passwoordvalid = await bcrypt.compare(password, user.password);

  if (!passwoordvalid) {
    return next(new GlobalError("credential invalid", 400));
  }

  const token = await JWT.sign({ id: user.id }, process.env.CRYPTO, {
    expiresIn: "7d",
  });
  res.status(201).json({ token });
});

const updateUser = catchAsyinc(async (req, res, netx) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({ name, email });
  user.password = undefined;
  res.status(203).json({ user });
});

const deleteUser = catchAsyinc(async (req, res, netx) => {
  const { user } = req;
  await user.update({ status: "inactive" });
  res.status(201).json({ status: "user deleted" });
});

const getOrdersUser = catchAsyinc(async (req, res, next) => {
  const { seccionUser } = req;
  const order = await Order.findAll({ where: { userId: seccionUser.id } });
  res.status(200).json({ order });
});

const getOrderUserByID = catchAsyinc(async (req, res, next) => {
  const { order } = req.params;
  res.status(200).json({ order });
});
module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getOrdersUser,
  getOrderUserByID,
};
