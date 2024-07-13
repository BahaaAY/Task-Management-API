const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const mongdb_url = process.env.MONGODB_URL;
const mongoose = require("mongoose");
const Task = require("./model/task");
const User = require("./model/user");

const user = new User({
  name: "test",
  email: "test",
  password: "test",
});

// const task = new Task({
//     title: "test",
//     description: "test",
//     status: "pending",
//     priority: "medium",
//     dueDate: new Date(),
//     user: "test",
//     category: "test",
// });
mongoose
  .connect(mongdb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    user.save();
  })
  .catch((err) => console.log(err));
