module.exports.isLoggedIn = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      return res.redirect("/login");
    }
    next();
  } catch (e) {
    console.log(e);
  }
};
