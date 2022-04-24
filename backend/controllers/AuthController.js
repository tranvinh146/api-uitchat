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
        return res.status(400).json("Incorrect username");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json("Incorrect password");
      }

      if (user && validPassword) {
        const accessToken = encode(user);
        const userInfo = {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        };

        res.status(200).json({ access_token: accessToken, user: userInfo });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, avatar } = req.body;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const UserResponse = await User.createUser(
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
      const userInfo = {
        email: UserResponse.email,
        name: UserResponse.name,
        avatar: UserResponse.avatar,
      };

      res.status(200).json({ access_token: accessToken, user: userInfo });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Unable to register user: ${err.message}` });
    }
  }
}
