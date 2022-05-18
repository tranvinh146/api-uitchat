import jwt from "jsonwebtoken";

export const encode = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(400).json({ message: "No access token provided" });
  }
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
};
