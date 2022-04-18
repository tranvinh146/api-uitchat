import jwt from "jsonwebtoken";

export async function encode(user) {
  return jwt.sign(
    { user_id: user._id, name: user.name, avatar: user.avatar },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "7d" }
  );
}

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_KEY);
    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function verifyServerOwner(req, res, next) {}

export async function verifyAdmin(req, res, next) {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const { isAdmin } = jwt.decode(token);
  if (isAdmin) {
    next();
  } else {
    res.status(403).json("You're not allowed to perform this action.");
  }
}
