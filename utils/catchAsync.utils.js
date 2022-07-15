const catchAsyinc = AF => {
  return (req, res, next) => {
    AF(req, res, next).catch(error => next(error));
  };
};

module.exports = { catchAsyinc };
