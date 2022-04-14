import ServersDAO from "../../dao/serversDAO.js";
import ServerModel from "../../models/serverModel.js";

export default class ServersController {
  static async apiGetServersByUserId(req, res, next) {
    try {
      const userId = req.query.userid;
      const serversPerPage = req.query.serverPerPage
        ? parseInt(req.query.serverPerPage)
        : 5;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const serversList = await ServerModel.getServersByUserId(userId);
      res.status(200).json(serversList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiGetServerById(req, res, next) {
    try {
      let id = req.params.id || {};
      let server = await ServerModel.getServerById(id);
      if (!server) {
        return res.status(404).json({ error: "not found" });
      }
      res.json(server);
    } catch (error) {
      console.error(`api error: ${error}`);
    }
  }

  static async apiPostServer(req, res, next) {
    try {
      const name = req.body.name;
      const avatar = req.body.avatar;
      const userId = req.body.user_id;
      const ServerResponse = await ServerModel.createServer(
        name,
        avatar,
        userId
      );
      let { error } = ServerResponse;
      if (error) {
        return res.json({ error });
      }
      res.json({ status: "success", new_server: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateServer(req, res, next) {
    try {
      const { server_id, user_id, ...updateField } = req.body;

      const ServerResponse = await ServerModel.updateServer(
        server_id,
        user_id,
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

  static async apiDeleteServer(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.body.user_id;
      const ServerResponse = await ServerModel.deleteServer(serverId, userId);
      let { error } = ServerResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      res.json({ status: "success" });
      // const role = req.body.role;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetChannelsByServerId(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const ServerResponse = await ServersDAO.getChannels(serverId);
      let { error } = ServerResponse;
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ status: "success", channel_list: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetUsersByServerId(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const ServerResponse = await ServersDAO.getUsers(serverId);
      let { error } = ServerResponse;
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ status: "success", server: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAddUsers(req, res, next) {
    try {
      const serverId = req.params.id;
      const adminId = req.body.user_id;
      const userIds = req.body.user_list;
      const ServerResponse = await ServerModel.addUsers(
        serverId,
        adminId,
        userIds
      );
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
