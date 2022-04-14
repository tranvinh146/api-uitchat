import { ObjectId } from "mongodb";
let channels;

export default class channelDAO {
    static async injectDB(conn) {
        if (channels) {
            return;
        }
        try {
            channels = await conn.db(process.env.UITCHAT_NS).collection("channels");
        } catch (e) {
            console.error(`unable to connect in channelDAO: ${e}`);
        }
    }

    // static async getChannelsByServerId(serverId) {
    //     try {
    //         return await servers
    //             .aggregate([
    //                 { $match: { _id: ObjectId(serverId) } },
    //                 {
    //                     $lookup: {
    //                         from: "channels",
    //                         localField: "_id",
    //                         foreignField: "channelId",
    //                         as: "channels",
    //                     },
    //                 },
    //             ])
    //             .next();
    //     } catch (e) {
    //         console.error(`something went wrong in getChannelByServerId: ${e}`);
    //         throw e;
    //     }
    // }

    static async getUsersByChannelId(channelId) {
        try {
            let cursor = await channels.find({ _id: ObjectId(channelId) });
            let object = await cursor.toArray();
            return object[0].usersList;
        } catch (e) {
            console.error(`something went wrong in getUsersByChannelId: ${e}`);
            throw e;
        }
    }

    static async deleteUsersByChannelId(channelId, usersList) {
        try {
            const deleteResponse = await channels.updateOne(
                { _id: ObjectId(channelId) },
                { $pull: { usersList: { $in: usersList } } });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete users: ${e}`);
            return { error: e };
        }
    }

    static async addUsersByChannelId(channelId, usersList, updatedAt) {
        try {
            const updateResponse = await channels.updateOne(
                { _id: ObjectId(channelId) },
                { $addToSet: { usersList: { $each: usersList } } },
                { $set: { updatedAt: updatedAt } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`something went wront in updateUsersByChannelId:${e}`);
            throw e;
        }
    }

    // static async getMessagesByChannelId(channelId) {
    //     try {
    //         let cursor = await channels.aggregate([
    //             {
    //                 $match: { _id: new ObjectId(channelId) }
    //             },
    //             {
    //                 $lookup: { from: 'messages', localField: '_id', foreignField: 'channelId', as: 'messages' }
    //             }
    //         ]).next();
    //         // let object = cursor.toArray();
    //         return cursor;

    //     } catch (e) {
    //         console.error(`something went wront in getMessagesByChannelId:${e}`);
    //         throw e;
    //     }
    // }

    static async addChannel(
        serverId,
        channelType,
        channelName,
        usersList,
        createdAt,
        updatedAt
    ) {
        try {
            const channelDoc = {
                serverId: serverId,
                channelType: channelType,
                channelName: channelName,
                usersList: usersList,
                createdAt: createdAt,
                updatedAt: updatedAt,
            };
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
                _id: ObjectId(channelId),
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete channel: ${e}`);
            return { error: e };
        }
    }
}
