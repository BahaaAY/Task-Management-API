import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmailTokenSchema = new Schema({
  userID: { type: Schema.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    expires: 28800, // in seconds (8 hours)
    default: () => Date.now() + 28800 * 1000, // 8 hours from now in milliseconds
  },
});

const EmailToken = mongoose.model("EmailToken", EmailTokenSchema);

export default EmailToken;
