const express = require("express");
const connectDB = require("./connect");
const User = require("./user");

const app = express();
const PORT = 3000;
const url =
  "mongodb+srv://dagim:32263363@nodeexpress2.fn9w0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.static("./client"));
app.use(express.json());
app.post("/api/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
app.get("/api/users/:id", async (req, res) => {
  const { id: user } = req.params;
  const singleUser = await User.findOne({ _id: user });
  res.json(singleUser);
});
app.delete("/api/users/:id", async (req, res) => {
  const { id: user } = req.params;
  const singleUser = await User.findOneAndDelete({ _id: user });
  res.json(singleUser);
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
