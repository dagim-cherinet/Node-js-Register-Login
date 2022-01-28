const express = require("express");
const connectDB = require("./connect");
const User = require("./user");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;
const url =
  "mongodb+srv://dagim:32263363@nodeexpress2.fn9w0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.static("./client"));
app.use(express.json());
app.post("/api/register", async (req, res) => {
  const { username, password: plainPassword } = req.body;
  //console.log(await bcrypt.hash(password, 5));
  if (!username) {
    return res.json({
      status: "error",
      error: "Invalid username/ no username",
    });
  }
  if (!plainPassword) {
    return res.json({
      status: "error",
      error: "Invalid password",
    });
  }
  const password = await bcrypt.hash(plainPassword, 5);
  try {
    const user = await User.create({ username, password });
    console.log(user);
    res.json(user);
  } catch (error) {
    //JSON.stringify(error);
    if (error.code === 11000) {
      console.log(error);
      return res.json({ status: "error", error: "username already in use" });
    }
    throw error;
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error" });
  }
});
app.get("/api/users/:id", async (req, res) => {
  const { id: user } = req.params;
  try {
    const singleUser = await User.findOne({ _id: user });
    res.json(singleUser);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error" });
  }
});
app.delete("/api/users/:id", async (req, res) => {
  const { id: user } = req.params;
  try {
    const singleUser = await User.findOneAndDelete({ _id: user });
    res.json(singleUser);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error" });
  }
});

const start = async () => {
  try {
    await connectDB(url);
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
