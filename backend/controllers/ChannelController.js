import Channel from "../models/Channel.js";

export default class ChannelsController {
  static async apiGetChannelById(req, res, next) {
    try {
      const userId = req.userId;
      const channelId = req.params.channelId;
      const channelResponse = await Channel.find({
        _id: channelId,
        $or: [{ memberIds: userId }, { ownerIds: userId }],
      });
      return res.status(200).json({ channel: channelResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiPostChannel(req, res, next) {
    try {
      // serverId, name, type, ownerIds, memberIds;
      const userId = req.userId;
      const serverId = req.body.serverId;
      const name = req.body.name;
      const type = req.body.type;
      const isPublic = req.body.isPublic;
      const ownerIds = req.body.ownerIds;
      const memberIds = req.body.memberIds;

      const channelResponse = await Channel.addChannel(
        userId,
        serverId,
        name,
        type,
        isPublic,
        ownerIds,
        memberIds
      );
      let { error } = channelResponse;
      if (error) {
        return res.status(401).json({ error });
      }
      res.status(201).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateChannel(req, res, next) {
    try {
      const channelId = req.body.channelId;
      const channelName = req.body.channelName;
      const memberId = req.member_id;

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

      res.status(204).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteChannel(req, res, next) {
    try {
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteChannel(channelId);

      res.status(204).json(channelResponse);
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

      res.status(200).json(channels);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateMembersByChannelId(req, res, next) {
    try {
      const membersList = req.body.membersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.updateMembersByChannelId(
        channelId,
        membersList
      );

      res.status(204).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteMembersByChannelId(req, res, next) {
    try {
      const membersList = req.body.membersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteMembersByChannelId(
        channelId,
        membersList
      );

      res.status(204).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateOwnersByChannelId(req, res, next) {
    try {
      const ownersList = req.body.membersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.updateOwnersByChannelId(
        channelId,
        ownersList
      );

      res.status(204).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteOwnersByChannelId(req, res, next) {
    try {
      const ownersList = req.body.membersList;
      const channelId = req.body.channelId;

      const channelResponse = await Channel.deleteOwnersByChannelId(
        channelId,
        ownersList
      );
      res.status(204).json(channelResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
