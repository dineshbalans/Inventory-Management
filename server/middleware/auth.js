const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
