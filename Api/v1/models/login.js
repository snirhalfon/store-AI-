const mongoose = require("mongoose");
mongoose.pluralize(null);

const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

let userModel;
try {
  userModel = mongoose.model("user");
} catch (error) {
  userModel = mongoose.model("user", loginSchema);
}

module.exports = userModel;
