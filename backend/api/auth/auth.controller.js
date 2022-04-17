import UsersDAO from "../../dao/usersDAO.js";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await User.findByCredential(username);
      if (!user) {
        res.status(404).json("Incorrect username");
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(404).json("Incorrect password");
        return;
      }

      if (user && validPassword) {
        const accessToken = jwt.sign(
          { userId: user._id, isAdmin: user.isAdmin },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "7d" }
        );
        res.status(200).json({ access_token: accessToken, user_id: user._id });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, name, avatar } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        // email
        username: username,
        password: hashedPassword,
        name: name,
        avatar: avatar,
        status: "offline",
      });

      const response = await user.save();
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: `Unable to register user, ${err}` });
    }
  }
}
