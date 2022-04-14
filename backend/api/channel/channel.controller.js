import { ObjectId } from "mongodb";
import ChannelsDAO from "../../dao/channelsDAO.js";
import Channel from "../../models/Channel";

import mongoose from "mongoose";

export default class ChannelsController {
    // static async apiGetChannelsByServerId(req, res, next) {
    //     try {
    //         let serverId = req.params.id || {};
    //         let channel = await ChannelsDAO.getChannelsByServerId(serverId);
    //         if (!channel) {
    //             res.status(404).json({ error: "not found server" });
    //             return;
    //         }
    //         res.json(channel);
    //     } catch (e) {
    //         res.status(500).json({ error: e.message });
    //     }
    // }

    static async apiGetUsersByChannelId(req, res, next) {
        try {
            const channelId = req.body.channelId;
            let users = await ChannelsDAO.getUsersByChannelId(channelId);
            if (!users) {
                res.status(404).json({ error: "not found channel" });
                return;
            }
            res.json(users);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteUsersByChannelId(req, res, next) {
        try {
            const usersList = req.body.usersList;
            const channelId = req.body.channelId;

            const channelResponse = await ChannelsDAO.deleteUsersByChannelId(
                channelId,
                usersList
            );

            res.json({ status: "success " });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiAddUsersByChannelId(req, res, next) {
        try {
            const usersList = req.body.usersList;
            const channelId = req.body.channelId;
            const updatedAt = new Date();

            const channelResponse = await ChannelsDAO.addUsersByChannelId(
                channelId,
                usersList,
                updatedAt
            )

            res.json({ status: "success " });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetMessagesByChannelId(req, res, next) {
        try {
            const channelId = req.body.channelId;
            let messages = await ChannelsDAO.getMessagesByChannelId(channelId);
            if (!messages) {
                res.status(404).json({ error: "not found channel" });
                return;
            }
            res.json(messages);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiPostChannel(req, res, next) {
        try {
            const serverId = req.body.serverId;
            const channelType = req.body.channelType;
            const channelName = req.body.channelName;
            const usersList = req.body.usersList;
            const createdAt = new Date();
            const updatedAt = new Date();

            const channelResponse = await ChannelsDAO.addChannel(
                serverId,
                channelType,
                channelName,
                usersList,
                createdAt,
                updatedAt,
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateChannel(req, res, next) {
        try {
            const channelId = req.body.channelId;
            const channelName = req.body.channelName;
            const updatedAt = new Date();

            const channelResponse = await ChannelsDAO.updateChannel(
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

    static async apiDeleteChannel(res, req, next) {
        try {
            const channelId = req.body.channelId;

            const channelResponse = await ChannelsDAO.deleteChannel(
                channelId
            );

            res.json({ status: "success " });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
