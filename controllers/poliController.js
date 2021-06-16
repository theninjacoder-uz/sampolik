const User = require("../models/User");
const { Ambulance, Consult, Queue } = require("../models/dbModels");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

let userId = null;

const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let error = { email: "", password: "" };

  //Email error
  if (err.message === "incorrect email") {
    error.email = "email ro'yxatdan o'tmagan";
  }
  //Password error
  if (err.message === "incorrect password") {
    error.password = "Parol xato";
  }

  if (err.code === 11000) {
    error.email = "Bu email ro'yxatdan o'tgan";
    // console.log(err);
    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "poliklinika 7", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    userId = String(user._id);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(201).json({ user: user._id });
    // console.log(user._id);
    userId = String(user._id);
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  // res.send("user login");
};

module.exports.index = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.render("index");
};
module.exports.loggedin = (req, res) => {
  res.render("loggedin");
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("index");
};

module.exports.ambulance_get = (req, res) => {
  res.render("ambulance");
};

module.exports.ambulance_post = async (req, res) => {
  // res.render("ambulance");
  const { telephone, address } = req.body;

  try {
    const tez = await Ambulance.create({ userId, telephone, address });
    res.status(200).json({ tez: userId });
  } catch (err) {
    console.log(err);
  }
};

module.exports.consulting_get = (req, res) => {
  res.render("consulting");
};

module.exports.consulting_post = async (req, res) => {
  // res.render("ambulance");
  const { specialist, birthdate, problems } = req.body;
  try {
    const patientReq = await Consult.create({
      userId,
      specialist,
      birthdate,
      problems,
    });
    res.status(200).json({ patientReq: userId });
  } catch (err) {
    console.log(err);
  }
};

module.exports.analyse_get = (req, res) => {
  res.render("analyse");
};

module.exports.doctor_get = (req, res) => {
  res.render("doctorMeet");
};

module.exports.doctor_post = async (req, res) => {
  // res.render("doctorMeet");
  const { specialist, meetDate, meetTime } = req.body;
  try {
    const meetDoctor = await Queue.create({
      userId,
      specialist,
      meetDate,
      meetTime,
    });
    res.status(200).json({ userId });
  } catch (err) {
    console.log(err);
  }
};

module.exports.request_get = (req, res) => {
  res.render("request");
};

module.exports.request_post = (req, res) => {
  // res.render("ambulance");
};

module.exports.posts_get = (req, res) => {
  res.render("posts");
};

module.exports.qon_get = (req, res) => {
  res.render("qon");
};

module.exports.peshob_get = (req, res) => {
  res.render("peshob");
};

module.exports.covid_get = (req, res) => {
  res.render("covid");
};

module.exports.umumiy_get = (req, res) => {
  res.render("umumiy");
};

module.exports.kardiogramma_get = (req, res) => {
  res.render("kardiogramma");
};
