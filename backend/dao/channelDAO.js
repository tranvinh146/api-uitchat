import { ObjectId } from "mongodb";
let channels;

export default class channelDAO {

    static async injectDB(conn) {
        if (channels) {
            return;
        }
        try {
            channel = await
                conn.db(process.env.UITCHAT_NS).collection('channels');
        } catch (e) {
            console.error(`unable to connect in channelDAO: ${e}`);
        }
    }

    static async getChannelByServerId(serverId) {
        try {
            return await channels.aggregate([
                { $match: { serverId: serverId } },
                { $lookup: { from: 'channels', localField: '_id', foreignField: 'channelId', as: 'channels' } }
            ]).next();
        } catch (e) {
            console.error(`something went wrong in getChannelByServerId: ${e}`);
            throw (e);
        }
    }

    static async addChannel(serverId, channelType, channelName, createdAt, updatedAt) {
        try {
            const channelDoc = {
                serverId: serverId,
                channelType: channelType,
                channelName: channelName,
                createdAt: createdAt,
                updatedAt: updatedAt
            }
            return await channels.insertOne(channelDoc);
        } catch (e) {
            console.error(`unable to add channel: ${e}`);
            return { error: e };
        }
    }

    static async updateChannel(serverId, channelId, channelName, updatedAt) {
        try {
            const updateResponse = await channels.updateOne(
                { serverId: serverId, _id: ObjectId(channelId) },
                { $set: { channelName: channelName, updatedAt: updatedAt } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`unable to update channel: ${e}`);
            return { error: e };
        }
    }

    static async deleteChannel(serverId, channelId) {
        try {
            const deleteResponse = await channels.deleteOne({
                serverId: serverId,
                _id: ObjectId(channelId)
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete channel: ${e}`);
            return { error: e };
        }
    }
}