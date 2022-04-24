import Server from "../models/Server.js";

export default class ServersController {
  // [GET]
  static async apiGetServersByUserId(req, res, next) {
    try {
      const userId = req.userId;
      const serversPerPage = req.query.serverPerPage
        ? parseInt(req.query.serverPerPage)
        : 5;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const serversList = await Server.getServersByUserId(userId);
      res.status(200).json({ status: "success", serversList });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [GET] /:id
  static async apiGetServerById(req, res, next) {
    try {
      let id = req.params.id;
      let server = await Server.getServerById(id);
      if (!server) {
        return res.status(404).json({ error: "not found" });
      }
      res.json(server);
    } catch (error) {
      console.error(`api error: ${error}`);
    }
  }

  // [POST]
  static async apiPostServer(req, res, next) {
    try {
      const name = req.body.name;
      const avatar = req.body.avatar;
      const userId = req.userId;
      const ownerIds = req.ownerIds;
      const memberIds = req.memberIds;
      const ServerResponse = await Server.createServer(name, avatar, userId, ownerIds, memberIds);
      let { error } = ServerResponse;
      if (error) {
        return res.json({ error });
      }
      res.json({ status: "success", new_server: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [PATCH]
  static async apiUpdateServer(req, res, next) {
    try {
      const { server_id, ...updateField } = req.body;

      const ServerResponse = await Server.updateServer(
        server_id,
        req.user_id,
        updateField
      );
      let { error } = ServerResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      res.json({ status: "success", server: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [DELETE]
  static async apiDeleteServer(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.user_id;
      const ServerResponse = await Server.deleteServer(serverId, userId);
      let { error } = ServerResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [POST] /users
  static async apiAddUsers(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const adminId = req.body.user_id;
      const userIds = req.body.user_list;
      const ServerResponse = await Server.addUsers(serverId, adminId, userIds);
      let { error } = ServerResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ status: "success", server: ServerResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [DELETE] /users
  static async apiRemoveUsers(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const adminId = req.body.user_id;
      const userIds = req.body.user_list;
      const ServerResponse = await Server.addUsers(serverId, adminId, userIds);
      let { error } = ServerResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ status: "success", server: ServerResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
