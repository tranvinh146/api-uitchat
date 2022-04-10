import { ObjectId } from "mongodb";
import ChannelsDAO from "../../dao/channelsDAO.js";

export default class ChannelsController {
  static async apiGetChannelsByServerId(req, res, next) {
    try {
      let serverId = req.params.id || {};
      let channel = await ChannelsDAO.getChannelsByServerId(serverId);
      if (!channel) {
        res.status(404).json({ error: "not found channel" });
        return;
      }
      res.json(channel);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostChannel(req, res, next) {
    try {
      const serverId = req.body.serverId;
      const channelType = req.body.channelType;
      const channelName = req.body.channelName;
      const createdAt = new Date();
      const updatedAt = new Date();

      const channelResponse = await ChannelsDAO.addChannel(
        serverId,
        channelType,
        channelName,
        createdAt,
        updatedAt
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateChannel(req, res, next) {
    try {
      const serverId = req.body.serverId;
      const channelId = req.body.channelId;
      const channelName = req.body.channelName;
      const updatedAt = new Date();

      const channelResponse = await ChannelsDAO.updateChannel(
        serverId,
        channelId,
        channelName,
        updatedAt
      );

      var { error } = channelResponse;

      if (error) {
        res.status.json({ error });
      }

      if (channelResponse.modifiedCount === 0) {
        throw new Error("unable to update channel");
      }

      res.json({ status: "success " });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //delete an existed channel
  static async apiDeleteChannel(res, req, next) {
    try {
      const serverId = req.body.serverId;
      const channelId = req.body.channelId;

      const channelResponse = await ChannelsDAO.deleteChannel(
        serverId,
        channelId
      );

      res.json({ status: "success " });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
