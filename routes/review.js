const express = require("express");
const router = express.Router();
const Produkt = require("../models/produkt.js");
const catchAsync = require("../utils/catchAsync.js");
const Review = require("../models/review.js");

const { isLoggedIn } = require("../middlewear.js");

router.route("/:id/review").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    const produkt = await Produkt.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    produkt.reviews.push(review);
    await review.save();
    await produkt.save();
    req.flash("success", "Created new review!");
    res.redirect(`/${produkt._id}`);
  })
);
router.route("/:id/review/:reviewId").delete(
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Produkt.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review");
    res.redirect(`/${id}`);
  })
);
module.exports = router;
