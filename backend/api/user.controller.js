import UsersDAO from '../dao/usersDAO.js';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';

const ObjectId = mongodb.ObjectId;
const saltRounds = 10;

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        const { usersList, totalNumUsers } = await UsersDAO.getUsers();
        const response = {
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
                name: req.body.name,
                username: req.body.username,
                password: hashedPassword,
                createdAt: new Date().toLocaleString(),
                status: "online"
            });
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiPatchUser(req, res, next) {
        try {
            const result = await UsersDAO.updateUser(req.body);
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