const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../service/userService");
const {
  default: AppSuccess,
} = require("../utils/response-handlers/AppSuccess");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // const newUser = new User({ username, password: hashedPassword });
    const newUser = await userService.registerUser({
      username,
      password: hashedPassword,
    });
    // Use the userService instead of new User({ username, password: hashedPassword });
    // await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await userService.findUser({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });
    res.json({ token });
    // return next(new AppSuccess({ user, token }, "User logged in successfully", 200));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
