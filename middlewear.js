const { ProduktsSchema } = require("./joivalidate.js");
const ExpressError = require("./utils/expressError.js");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/elegant/login");
  }
  next();
};
module.exports.validateProdukt = (req, res, next) => {
  const { error } = ProduktsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
