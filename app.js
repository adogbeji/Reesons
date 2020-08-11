//jshint esversion:6

require("dotenv").config({path: "./config.env"});
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.set("view engine", "ejs");

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET_STRING,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// For Next Time: Start building 'Register' Page!

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/pricing", (req, res) => {
  res.render("pricing");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/success", (req, res) => {  // Testing Route
  res.render("contact-success");
});

app.get("/login", (req, res) => {
  res.render("login");
});

const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
