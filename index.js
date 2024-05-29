require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const methodOveride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const elegant = require("./routes/produkt.js");
const dbUrl = process.env.MONGO_URI;
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");

const stripe = require("stripe")(process.env.SECRET_KEY);
const catchAsync = require("./utils/catchAsync.js");
const reviewRoutes = require("./routes/review.js");
const Produkt = require("./models/produkt.js");
const PORT = process.env.PORT;
const store = new MongoStore({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "thisshouldbeabettersecret!",
  },
});
store.on("error", function (e) {
  console.log("SESSIONSTORE ERROR", e);
});
const sessionConfig = {
  store,
  name: "blah",
  secret: "this",
  // secure: true,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database opened");
});

app.use(session(sessionConfig));
app.use(flash());
app.set("env", "development");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //store it in session
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  if (req.user) {
    req.user
      .populate("produkts")
      .then((user) => {
        res.locals.currentUser = user;
        next();
      })
      .catch((err) => {
        console.error("Error populating produkts:", err);
        next(err);
      });
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
  } else {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.post(
  "/checkout",
  isAuthenticated,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id).populate("produkts");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.locals.currentUser = user;

    if (!user.produkts.length) {
      return res.status(400).send("No products found for user");
    }

    const lineItems = user.produkts.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.val,
    }));
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/successs`,
      cancel_url: `${req.headers.origin}/cart`,
    }); //OD TUKA TREBA DA SE IZBIRSA PRODUKTO OD PRODUKTS ARRAY OTI AKO E COMPLETE TREBA SAMO DA SE ISPRATE U NEKOJ ORDER MODEL I DA SE CUVA U USER ZA POSLE DISPLAY
    res.redirect(session.url);
  })
);

app.use("", userRouter);
app.use("", elegant);
app.use("", reviewRoutes);
app.listen(PORT, () => {
  console.log("serving 3000");
});
