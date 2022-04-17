import UsersDAO from "../../dao/usersDAO.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        const { usersList, totalNumUsers } = await UsersDAO.getUsers();
        let response = {
            users: usersList,
            total_results: totalNumUsers,
        };
        res.json(response);
    }

    static async getById(req, res, next) {
        const { id } = req.params;
        const response = await UsersDAO.getUserById(id);
        res.json(response);
    }

    static async apiPostUser(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const result = await UsersDAO.addUser({
                username: req.body.username,
                password: hashedPassword,
                name: req.body.name,
                createdAt: new Date().toLocaleString(),
                status: "online",
                isAdmin: false,
            });
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiPatchUser(req, res, next) {
        try {
            const { userId, ...newValues } = req.body;
            const result = await UsersDAO.updateUser(userId, newValues);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const result = await UsersDAO.deleteUser(req.body.userId);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
