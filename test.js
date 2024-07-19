import { config } from "dotenv";

config({ path: ".env" });

const mongdb_url = process.env.MONGODB_URL;
import { connect } from "mongoose";
import User from "./models/user.js";

connect(mongdb_url, {})
  .then(() => {
    console.log("MongoDB connected");
    testToken.save();
  })
  .catch((err) => console.log(err));
