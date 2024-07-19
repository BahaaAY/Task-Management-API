import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmailTokenSchema = new Schema({
  userID: { type: Schema.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    expires: 8 * 3600, // in 8 hours
    default: Date.now,
  },
});

const EmailToken = mongoose.model("EmailToken", EmailTokenSchema);

export default EmailToken;
