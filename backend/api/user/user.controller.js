import UsersDAO from "../../dao/usersDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    let filters = {};

    const { usersList, totalNumUsers } = await UsersDAO.getUsers();
    let response = {
      users: usersList,
      total_results: totalNumUsers,
    };
    res.json(response);
  }

  static async apiPostUser(req, res, next) {
    try {
      const result = await UsersDAO.addUser({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        status: "online",
      });
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    const response = await UsersDAO.getUserById(id);
    res.json(response);
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
