import ServersDAO from "../../dao/serversDAO.js";

export default class ServersController {
  static async apiGetServers(req, res, next) {
    const userId = req.body.user_id;
    const serversList = await ServersDAO.getServers(userId);
    res.json(serversList);
  }

  static async apiGetServerById(req, res, next) {
    try {
      let id = req.params.id || {};
      let server = await ServersDAO.getServerById(id);
      if (!server) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(server);
    } catch (error) {
      console.error(`api error: ${error}`);
    }
  }

  static async apiPostServer(req, res, next) {
    try {
      const userId = req.body.user_id;
      const name = req.body.name;
      const role = "";
      const date = new Date();
      const ServerResponse = await ServersDAO.addServer(
        userId,
        name,
        role,
        date
      );
      let { error } = ServerResponse;
      if (error) {
        return res.json({ error });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateServer(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.body.user_id;
      const name = req.body.name;
      const role = req.body.role;
      const date = new Date();
      const ServerResponse = await ServersDAO.updateServer(
        serverId,
        userId,
        role,
        name,
        date
      );
      let { error } = ServerResponse;
      if (error) {
        res.json({ error });
      }
      if (ServerResponse.modifiedCount === 0) {
        throw new Error("unable to update server. User may not have permisson");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteServer(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.body.user_id;
      const ServerResponse = await ServersDAO.deleteSever(serverId, userId);
      let { error } = ServerResponse;
      if (error) {
        res.json({ error });
      }
      if (ServerResponse.deletedCount === 0) {
        throw new Error(
          "unable to delete server. User may not have permission."
        );
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
      res.status(200).json({ status: "success", user_list: ServerResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
