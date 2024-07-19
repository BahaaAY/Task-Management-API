import { config } from "dotenv";

config({ path: ".env" });

const mongdb_url = process.env.MONGODB_URL;
import { connect } from "mongoose";
import User from "./models/user.js";

import EmailToken from "./models/email_token.js";

const testToken = new EmailToken({
  userID: "669a0c46065492b9927750d4",
  token: "test",
});
// const user = new User({
//   firstName: "test",
//   lastName: "test",
//   email: "test",
//   password: "test",
// });

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
    testToken.save();
  })
  .catch((err) => console.log(err));
