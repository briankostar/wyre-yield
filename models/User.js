import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  // required: true,
  // unique: true,
  wyreAccount: String,
  wyreWallet: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
