import { config } from "dotenv";

config({ path: ".env" });

const mongdb_url = process.env.MONGODB_URL;
import { connect } from "mongoose";
import User from "./models/user.js";

const user = new User({
  firstName: "test",
  lastName: "test",
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
connect(mongdb_url, {})
  .then(() => {
    console.log("MongoDB connected");
    user.save();
  })
  .catch((err) => console.log(err));
