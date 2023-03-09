const express = require("express");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const victimRoute = require("./victims");

require("dotenv/config");
require("../passport");

const router = express.Router();

//middleware
router.use(passport.initialize());

//routes
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register", async (req, res) => {
  const dublicate = await Admin.findOne({ name: req.body.name });
  if (dublicate) {
    return res.status(400).send({
      success: false,
      message: "Username already registered",
    });
  }
  const admin = new Admin({
    name: req.body.name,
    password: await bcrypt.hash(req.body.password, 10),
  });
  try {
    const savedAdmin = await admin.save();
    res.send({
      success: true,
      message: "Admin saved",
      admin: {
        name: savedAdmin.name,
        id: savedAdmin._id,
      },
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Admin not saved",
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ name: req.body.name });
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "incorrect password",
      });
    }
    const payload = {
      name: admin.name,
      id: admin._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Logged in Successfully",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Invalid name",
      error: err,
    });
  }
});

// victim
router.use(
  "/victim",
  passport.authenticate("jwt", { session: false }),
  victimRoute
);

module.exports = router;
