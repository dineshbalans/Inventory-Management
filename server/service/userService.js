import User from "../models/User.js";

export const registerUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

export const findUser = async (data) => {
  const user = await User.findOne(data);
  return user;
};
