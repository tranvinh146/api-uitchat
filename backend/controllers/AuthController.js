import User from "../models/User.js";
import bcrypt from "bcrypt";
// import middlewares encode
import { encode } from "../middleware/jwt.js";

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findByCredential(email);
      if (!user) {
        res.status(404).json("Incorrect username");
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json("Incorrect password");
        return;
      }

      if (user && validPassword) {
        const accessToken = encode(user);
        res.status(200).json({ success: true, access_token: accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, avatar } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const UserResponse = await Server.createUser(
        email,
        hashedPassword,
        name,
        avatar
      );
      let { error } = UserResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      const accessToken = encode(UserResponse);

      res.status(200).json({ access_token: accessToken });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Unable to register user, ${err.message}` });
    }
  }
}
