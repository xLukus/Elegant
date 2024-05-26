const express = require("express");
const router = express.Router();
const Produkt = require("../models/produkt.js");
const catchAsync = require("../utils/catchAsync.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const { isLoggedIn, validateProdukt } = require("../middlewear.js");
router
  .route("/")
  .get(
    catchAsync(async (req, res) => {
      let produkts = await Produkt.find();
      res.render("home", { produkts });
    })
  )
  .post(
    validateProdukt,
    catchAsync(async (req, res) => {
      const product = new Produkt(req.body);
      await product.save();
      req.flash("success", "Made a new Produkt");
      res.redirect(`/elegant/${product._id}`);
    })
  );
router.route("/successs").get(isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("produkts");
  res.locals.currentUser = user;
  for (let product of user.produkts) {
    let productId = product.id;
    await Produkt.findByIdAndDelete(productId);
  }
  req.flash("success", "Order Made Successfully");
  res.render("successs");
});
router.route("/new").get(isLoggedIn, (req, res) => {
  user = req.user;
  userId = user._id.toString();
  if (userId != process.env.ADMIN) {
    res.redirect("/elegant/login");
  } else {
    res.render("new");
  }
});
router.route("/contact").get((req, res) => {
  res.render("contact");
});

router.route("/all").get(
  catchAsync(async (req, res) => {
    const products = await Produkt.find();
    res.render("all", { products });
  })
);
router.route("/shop").get(
  catchAsync(async (req, res) => {
    const products = await Produkt.find();
    res.render("shop", { products });
  })
);

router.route("/cart").get(isLoggedIn, (req, res) => {
  res.render("cart");
});

router.route("/addToCart").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    const id = req.body.productId;
    const kol = req.body.kol;
    const userId = req.body.user;
    const product = await Produkt.findById(id);
    const clonedProduct = new Produkt({
      _id: new mongoose.Types.ObjectId(),
      name: product.name,
      price: product.price,
      description: product.description,
      val: kol,
      image: product.image,
      measurments: product.measurments,
      category: product.category,
      author: product.author,
    });
    const foundUser = await User.findById(userId);
    await clonedProduct.save();
    foundUser.produkts.push(clonedProduct);
    await foundUser.save();
    req.flash("success", "Successfully added to cart");
    res.redirect("/elegant/shop");
  })
);
//delete from cart
router.route("/deleteFromCart").delete(
  isLoggedIn,
  catchAsync(async (req, res) => {
    const id = req.body.id;
    const userid = req.body.userid;
    await User.findByIdAndUpdate(userid, {
      $pull: { produkts: id },
    });
    await Produkt.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted from cart");
    res.redirect(req.get("referer"));
  })
);

router
  .route("/:id")
  .get(
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const product = await Produkt.findById(id)
        .populate({
          path: "reviews",
          populate: {
            path: "author",
          },
        })
        .populate("author");
      const user = req.user || "a";
      if (user) {
        res.render("show", { product, user });
      }
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const { id } = req.params;
      await Produkt.findByIdAndDelete(id);
      req.flash("success", "Successfully Deleted");
      res.redirect("/elegant/shop");
    })
  )
  .post(
    validateProdukt,
    catchAsync(async (req, res) => {
      const { id } = req.body;
      const product = await Produkt.findByIdAndUpdate(id, {
        ...req.body,
      });
      await product.save();
      req.flash("success", "Successfully Updated");
      res.redirect(`/elegant/${id}`);
    })
  );
router.route("/:id/edit").get(
  validateProdukt,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Produkt.findById(id);
    res.render("edit", { product });
  })
);

module.exports = router;
