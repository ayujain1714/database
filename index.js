const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const { connectMongodb } = require("./connection");
const UserRoutes = require("./routes/user");

const PORT = 6001;

connectMongodb("mongodb://127.0.0.1:27017/Test_project")
  .then(() => console.log("Connnected to MongoDb"))
  .catch((err) => console.log("There is some error : ", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use("/", UserRoutes);

app.listen(PORT, () => console.log(`Listning on http://localhost:${PORT}`));
