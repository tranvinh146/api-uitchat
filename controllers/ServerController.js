import Server from "../models/Server.js";
import User from "../models/User.js";

export default class ServersController {
  // [GET] /servers
  static async apiGetServersByUserId(req, res, next) {
    try {
      const userId = req.userId;
      // const serversPerPage = req.query.serverPerPage
      //   ? parseInt(req.query.serverPerPage)
      //   : 5;
      // const page = req.query.page ? parseInt(req.query.page) : 0;
      const serversList = await Server.getServersByUserId(userId);
      res.status(200).json({ serversList });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [GET] /servers/:id
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

  // [POST] /servers
  static async apiPostServer(req, res, next) {
    try {
      const name = req.body.name;
      const avatar = req.body.avatar;
      const userId = req.userId;
      const response = await Server.createServer(name, avatar, userId);
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ ...response });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [PATCH] /servers
  static async apiUpdateServer(req, res, next) {
    try {
      const { server_id, ...updateField } = req.body;

      const response = await Server.updateServer(
        server_id,
        req.userId,
        updateField
      );
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      const server = await Server.findById(server_id);
      res.status(200).json({ server });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [DELETE] /servers
  static async apiDeleteServer(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.userId;
      const response = await Server.deleteServer(serverId, userId);
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // [POST] /servers/members
  static async apiAddMembers(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.userId;
      // const ownerIds = req.body.owner_ids;
      const memberIds = req.body.member_ids;
      const response = await Server.addMembers(
        serverId,
        userId,
        // ownerIds,
        memberIds
      );
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ memberInfos: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [DELETE] /servers/users
  static async apiRemoveMembers(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.userId;
      const memberIds = req.body.member_ids;
      const response = await Server.removeMember(serverId, userId, memberIds);
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      const server = await Server.findById(serverId);
      res.status(200).json({ server });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [POST] /servers/users/owner-role
  static async apiGrantOwner(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.userId;
      const memberId = req.body.member_id;
      const response = await Server.grantOwner(serverId, userId, memberId);
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      const server = await Server.findById(serverId);
      res.status(200).json({ server });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // [DELETE] /servers/users/owner-role
  static async apiRevokeOwner(req, res, next) {
    try {
      const serverId = req.body.server_id;
      const userId = req.userId;
      const ownerId = req.body.owner_id;
      const response = await Server.revokeOwner(serverId, userId, ownerId);
      let { error } = response;
      if (error) {
        return res.status(400).json({ error });
      }
      const server = await Server.findById(serverId);
      res.status(200).json({ server });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
