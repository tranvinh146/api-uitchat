import User from "../models/User.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default class UserController {
    // [GET] /users
    static async getAll(req, res, next) {
        try {
            const response = await User.find({});
            res.status(200).json(response);
        } catch (err) {
            console.error(`Unable to issue find command, ${err}`);
            res.status(500).json({
                error: `Unable to issue find command, ${err}`,
            });
        }
    }
    
    // [GET] /users/:id
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const response = await User.findById(id);
            res.status(200).json(response);
        } catch (err) {
            console.error(`Unable to issue find command, ${err}`);
            res.status(500).json({
                error: `Unable to issue find command, ${err}`,
            });
        }
    }

    // [POST] /users
    static async add(req, res, next) {
        try {
            const { username, password, name } = req.body;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                username: username,
                password: hashedPassword,
                name: name,
                status: "offline",
                createAt: new Date().toLocaleString(), // 10/04/2022, 8:15:21 am
                isAdmin: false,
            });

            const response = await user.save();
            res.status(200).json({ status: "success" });
        } catch (err) {
            console.error(`Unable to save user, ${err}`);
            res.status(500).json({ error: `Unable to save user, ${err}` });
        }
    }

    // [PATCH] /users
    static async update(req, res, next) {
        try {
            const userId = req.user_id;
            const newValues = req.body;
            const response = await User.updateOne({ _id: user_id }, newValues);
            res.status(200).json({ status: "success" });
        } catch (err) {
            console.error(`Unable to update user, ${err}`);
            res.status(500).json({ error: `Unable to update user, ${err}` });
        }
    }

    // [DELETE] /users
    static async delete(req, res, next) {
        try {
            const { user_id } = req.body;
            const response = await User.findByIdAndDelete(user_id);
            res.status(200).json({ status: "success" });
        } catch (err) {
            console.error(`Unable to update user, ${err}`);
            res.status(500).json({ error: `Unable to update user, ${err}` });
        }
    }
}
