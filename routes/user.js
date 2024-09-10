const express = require("express");
const path = require("path");

const User = require("../models/UserSchema");

const {
  GetForm,
  GetLogin,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
  handleGetallUsers,
  Getdata,
  GetAbout,
} = require("../controllers/user");

const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/about", GetAbout);

router.get("/services", GetForm);

router.post("/Createuser", handleCreateUser);

router.get("/Login", GetLogin);

router.post("/LoginUser", handleLogin);

router.get("/deleteUser/:id", handleDeleteUser);

router.get("/all", restrictToLoggedinUserOnly, handleGetallUsers);

router.get("/data", restrictToLoggedinUserOnly, Getdata);

module.exports = router;
