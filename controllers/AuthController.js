import User from "../models/User.js";
import bcrypt from "bcrypt";
// import middlewares encode
import { encode } from "../middleware/jwt.js";

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
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
          id: user._id,
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

  static async oauthLogin(req, res, next) {
    try {
      const { uid, email, name, avatar } = req.body;

      // find or create
      let user = await User.findOne({ uid: uid });

      if (!user) {
        // create if user does't exist
        user = {
          uid: uid,
          email: email,
          name: name,
          avatar: avatar,
        };
        await User.create(user);
      } else {
        // update exist user
        user.email = email;
        user.name = name;
        user.avatar = avatar;
        await user.save();
      }

      const accessToken = encode(user);
      const userInfo = {
        id: user._id,
        uid: user.uid,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      };

      res.status(200).json({ access_token: accessToken, user: userInfo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userResponse = await User.createUser(email, hashedPassword, name);
      let { error } = userResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      const accessToken = encode(userResponse);
      const userInfo = {
        email: userResponse.email,
        name: userResponse.name,
        avatar: userResponse.avatar,
      };

      res.status(200).json({ access_token: accessToken, user: userInfo });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Unable to register user: ${err.message}` });
    }
  }
}
