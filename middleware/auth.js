const { stringify } = require("uuid");
const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies.uid;

  if (!userUid) return res.send("Login first.");

  const user = getUser(userUid);
  if (!user) return res.json({ message: "no user" });
  console.log(user);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
