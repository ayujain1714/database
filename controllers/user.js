const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/UserSchema");
const { setUser } = require("../service/auth");

let LoggedIn = false;

async function handleGetallUsers(req, res) {
  res.sendFile(path.join(__dirname, "..", "/public/all.html"));
}

async function Getdata(req, res) {
  const allUser = await User.find({});
  const data = allUser.map((user) => user);
  res.json(data);
}

async function GetForm(req, res) {
  res.sendFile(path.join(__dirname, "..", "/public/form.html"));
}

async function GetAbout(req, res) {
  res.send(LoggedIn);
}

async function GetLogin(req, res) {
  res.sendFile(path.join(__dirname, "..", "/public/Login.html"));
}

async function handleCreateUser(req, res) {
  await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
  })
    .then(() => {
      console.log(req.body);
      res.sendFile(path.join(__dirname, "..", "/public/success.html"));
      res.status(201);
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.send("Either email or Contact no. already exist <br>" + err);
      } else {
        res.send("Unknown Error....");
      }
      console.log(err);
    });
}

async function handleDeleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.send("success");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return (
      res.sendFile(path.join(__dirname, "..", "/public/fail.html")),
      {
        error: "Invalid email or password",
      }
    );

  const SessionId = uuidv4();
  setUser(SessionId, user);
  res.cookie("uid", SessionId);
  LoggedIn = true;
  return res.redirect("/all");
}

module.exports = {
  handleGetallUsers,
  Getdata,
  GetForm,
  GetLogin,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
  GetAbout,
};
