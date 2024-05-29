const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const Produkt = require("../models/produkt.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isLoggedIn, validateProdukt } = require("../middlewear.js");
router
  .route("/login")
  .get((req, res) => {
    res.render("user/login");
  })
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    (req, res) => {
      req.flash("success", "Welcome to Elegant");
      const redirectUrl = req.session.returnTo || "/";
      delete req.session.returnTo;

      res.redirect(redirectUrl);
    }
  );
router
  .route("/register")
  .get((req, res) => {
    res.render("user/register");
  })
  .post(
    catchAsync(async (req, res, next) => {
      try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Welcome to Elegant");
          res.redirect("/");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
      }
    })
  );
router.route("/logout").get((req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
});
router
  .route("/user/:id")
  .get(
    isLoggedIn,
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const user = await User.findById(id);
      console.log(user);
      res.render("user", { user });
    })
  )
  .post(
    isLoggedIn,
    catchAsync(async (req, res) => {
      let { email, name, oldpassword, newpassword, retypepassword } = req.body;
      if (newpassword !== retypepassword) {
        req.flash("error", "New passwords do not match");
        res.redirect(req.get("referer"));
      }
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          req.flash("error", "User not found");
          res.redirect(req.get("referer"));
        }

        user.changePassword(oldpassword, newpassword, (err) => {
          if (err) {
            if (err.name === "IncorrectPasswordError") {
              req.flash("error", "Incorrect old password");
            } else {
              req.flash(
                "error",
                "An error occurred while changing the password"
              );
            }
            res.redirect(req.get("referer"));
          }

          req.flash("success", "Password successfully updated");
          res.redirect(req.get("referer"));
        });
      } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred");
        res.redirect(req.get("referer"));
      }
    })
  );

module.exports = router;
