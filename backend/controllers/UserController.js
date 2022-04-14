import User from "../models/User.js";
import bcrypt from "bcrypt";

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
            res.status(500).json({ error: `Unable to issue find command, ${err}` });
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
            res.status(500).json({ error: `Unable to update user, ${err}` });
        }
    }
}
