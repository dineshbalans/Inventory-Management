import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;
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

export default auth;
