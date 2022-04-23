import User from "../models/User.js";
import Server from "../models/Server.js";
import mongodb from "mongodb";

const { ObjectId } = mongodb;

export default class UserController {
  // [GET] /users/server/:id
  static async apiGetUsersByServerId(req, res, next) {
    try {
      const server = await Server.findById(req.params.id);
      const userIds = server.userIds;
      const response = await User.find({ _id: { $in: userIds } });
      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: `Unable to issue find command, ${err}` });
    }
  }

  // [GET] /users/:id
  static async apiGetById(req, res, next) {
    try {
      const { id } = req.userId;
      const response = await User.findById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: `Unable to issue find command, ${err}` });
    }
  }

  // [PATCH] /users
  static async apiUpdate(req, res, next) {
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
  static async apiDelete(req, res, next) {
    try {
      const { user_id } = req.body;
      const response = await User.findByIdAndDelete(user_id);
      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: `Unable to update user, ${err}` });
    }
  }

  // [POST] /:userid/join/:serverid
  static async apiJoinServer(req, res, next) {
      try {
        const serverId = ObjectId(req.params.serverid);
        const userId = req.userId;

        const response = await User.joinServer(userId, serverId);
        res.status(200).json({ status: "success" });
      } catch (error) {
        res.status(500).json({ error: `Unable to join server, ${error}` });
      }
  }
}
