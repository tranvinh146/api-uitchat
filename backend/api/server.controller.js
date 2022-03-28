import ServersDAO from "../dao/serversDAO.js";

export default class ServersController {
  static async apiGetServers(req, res, next) {
    const userId = "";
    const serversList = await ServersDAO.getServers(userId);
    let response = { serversList };

    res.json(response);
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
      const serverId = req.body.server_id;
      const channel = req.body.channel;
      const userId = req.body.user_id;
      const date = new Date();
      const ServerResponse = await ServersDAO.addServer(server);
    } catch (error) {}
  }

  static async apiUpdateServer(req, res, next) {}

  static async apiDeleteServer(req, res, next) {}
}

const role = {
  admin: [123, 123123, 123123],
  normal: [456, 456456],
};
