import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        serverId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        name: {
            type: String,
            maxLength: 30,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        avatar: String,
        leadersList: [mongoose.SchemaTypes.ObjectId],
        usersList: [mongoose.SchemaTypes.ObjectId]
    },
    {
        timestamps: true
    }
)

channelSchema.statics.addChannel = async function (serverId, name, type, avatar, leadersList, usersList) {
    try {
        const channel = await this.create({
            serverId: serverId,
            name: name,
            type: type,
            avatar: avatar,
            leadersList: leadersList,
            usersList: usersList
        })
        return channel;
    } catch (e) {
        console.error(`unable to add channel: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.deleteChannel = async function (channelId) {
    try {
        const deleteResponse = await this.deleteOne({
            _id: ObjectId(channelId),
        });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete channel: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.updateChannel = async function (channelId, channelName) {
    try {
        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $set: { name: channelName } }
        );
        return updateResponse;
    } catch (e) {
        console.error(e.message);
    }
}

channelSchema.statics.getChannelsByServerId = async function (serverId) {
    try {
        let channels = await this.find({ serverId: ObjectId(serverId) });
        return channels;
    } catch (e) {
        console.error(`something went wrong in getChannelByServerId: ${e}`);
        throw e;
    }
}

channelSchema.statics.deleteUsersByChannelId = async function (channelId, usersList) {
    try {
        const deleteResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { usersList: { $in: usersList } } });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete users: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.updateUsersByChannelId = async function (channelId, usersList) {
    try {
        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $addToSet: { usersList: { $each: usersList } } }
        );
        return updateResponse;
    } catch (e) {
        console.error(`something went wront in updateUsersByChannelId:${e}`);
        throw e;
    }
}

channelSchema.statics.deleteLeadersByChannelId = async function (channelId, leadersList) {
    try {
        const deleteResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { leadersList: { $in: leadersList } } });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete users: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.updateLeadersByChannelId = async function (channelId, leadersList) {
    try {
        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $addToSet: { leadersList: { $each: leadersList } } }
        );
        return updateResponse;
    } catch (e) {
        console.error(`something went wront in updateUsersByChannelId:${e}`);
        throw e;
    }
}


export default mongoose.model("Channel", channelSchema)