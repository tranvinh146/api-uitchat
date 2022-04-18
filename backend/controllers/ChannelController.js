import Channel from "../models/Channel.js";

export default class ChannelsController {
  static async apiPostChannel(req, res, next) {
    try {
      const serverId = req.body.serverId;
      const channelType = req.body.channelType;
      const channelName = req.body.channelName;
      const channelAvatar = req.body.channelAvatar;
      const leadersList = req.body.leadersList;
      const usersList = req.body.usersList;

      const channelResponse = await Channel.addChannel(
        serverId,
        channelName,
        channelType,
        channelAvatar,
        leadersList,
        usersList
      );
      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateChannel(req, res, next) {
    try {
      const channelId = req.body.channelId;
      const channelName = req.body.channelName;
      const userId = req.user_id;

      const channelResponse = await Channel.updateChannel(
        channelId,
        channelName
      );

      var { error } = channelResponse;

      if (error) {
        res.status(400).json({ error });
      }

      if (channelResponse.modifiedCount === 0) {
        throw new Error("unable to update channel");
      }

      res.status(200).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteChannel(req, res, next) {
    try {
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteChannel(channelId);

      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetChannelsByServerId(req, res, next) {
    try {
      const serverId = req.params.serverId || {};
      let channels = await Channel.getChannelsByServerId(serverId);
      if (!channels) {
        res.status(404).json({ error: "not found channels" });
        return;
      }

      res.json(channels);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUsersByChannelId(req, res, next) {
    try {
      const usersList = req.body.usersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.updateUsersByChannelId(
        channelId,
        usersList
      );

      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteUsersByChannelId(req, res, next) {
    try {
      const usersList = req.body.usersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteUsersByChannelId(
        channelId,
        usersList
      );

      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateLeadersByChannelId(req, res, next) {
    try {
      const leadersList = req.body.usersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.updateLeadersByChannelId(
        channelId,
        leadersList
      );

      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteLeadersByChannelId(req, res, next) {
    try {
      const leadersList = req.body.usersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteLeadersByChannelId(
        channelId,
        leadersList
      );
      res.json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
