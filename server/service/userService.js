const User = require("../models/User");

exports.registerUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

exports.findUser = async (data) => {
  const user = await User.findOne(data);
  return user;
};
