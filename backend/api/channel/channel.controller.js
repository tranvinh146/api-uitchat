import { ObjectId } from "mongodb";
import ChannelsDAO from "../../dao/channelsDAO.js";
import ChannelModel from "../../models/Channel.js";
import mongoose from "mongoose";

export default class ChannelsController {

    static async apiPostChannel(req, res, next) {
        try {
            const serverId = req.body.serverId;
            const channelType = req.body.channelType;
            const channelName = req.body.channelName;
            const channelAvatar = req.body.channelAvatar;
            const leadersList = req.body.leadersList;
            const usersList = req.body.usersList;

            const channelResponse = await ChannelModel.addChannel(
                serverId,
                channelName,
                channelType,
                channelAvatar,
                leadersList,
                usersList,
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

            const channelResponse = await ChannelModel.updateChannel(
                channelId,
                channelName
            );

            var { error } = channelResponse;

            if (error) {
                res.status.json({ error });
            }

            if (channelResponse.modifiedCount === 0) {
                throw new Error("unable to update channel");
            }

            res.json(channelResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteChannel(req, res, next) {
        try {
            const channelId = req.body.channelId;

            const channelResponse = await ChannelModel.deleteChannel(
                channelId
            );

            res.json(channelResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetChannelsByServerId(req, res, next) {
        try {
            const serverId = req.params.serverId || {};
            let channels = await ChannelModel.getChannelsByServerId(serverId);
            if (!channels) {
                res.status(404).json({ error: "not found server" });
                return;
            }

            res.json(channels);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetChannel(req, res, next) {
        try {
            const channelId = req.params.channelId || {};
            let channel = await ChannelModel.getChannel(channelId);
            if (!channel) {
                res.status(400).json({ error: "not found channel" });
                return;
            }

            res.json(channel);
        } catch (e) {
            res.status
        }
    }

    static async apiUpdateUsersByChannelId(req, res, next) {
        try {
            const usersList = req.body.usersList;
            const channelId = req.body.channelId;

            const channelResponse = await ChannelModel.updateUsersByChannelId(
                channelId,
                usersList
            )

            res.json(channelResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteUsersByChannelId(req, res, next) {
        try {
            const usersList = req.body.usersList;
            const channelId = req.body.channelId;

            const channelResponse = await ChannelModel.deleteUsersByChannelId(
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

            const channelResponse = await ChannelModel.updateLeadersByChannelId(channelId, leadersList);

            res.json(channelResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteLeadersByChannelId(req, res, next) {
        try {
            const leadersList = req.body.usersList;
            const channelId = req.body.channelId;

            const channelResponse = await ChannelModel.deleteLeadersByChannelId(channelId, leadersList);
            res.json(channelResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
