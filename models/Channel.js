import mongoose from "mongoose";
import Server from "./Server.js";
import User from "./User.js";

const channelSchema = new mongoose.Schema(
    {
        serverId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Server"
        },
        name: {
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            // enum: ["text", "voice"],
        },
        ownerIds: { type: [mongoose.Types.ObjectId], ref: "User" },
        memberIds: { type: [mongoose.Types.ObjectId], ref: "User" },
    },
    {
        timestamps: true,
    }
);

channelSchema.statics.getChannelById = async function (channelId) {
    try {
        return await this.findById(channelId)
            .populate({
                path: "memberIds",
                select: ["_id", "email", "name", "avatar"],
            })
            .populate({
                path: "ownerIds",
                select: ["_id", "email", "name", "avatar"],
            });
    } catch (error) {
        console.error(`something went wrong in getChannelById: ${error}`);
        throw error;
    }
};

channelSchema.statics.addChannel = async function (
    userId, // backend added
    serverId,
    name,
    type,
    isPublic,
    ownerIds,
    memberIds
) {
    try {
        //checking if userId is in ownerIds of server
        let server = await Server.findById(serverId).populate('ownerIds', '_id');
        if (!server.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        let channel;

        if (isPublic) {
            channel = await this.create({
                serverId,
                name,
                type,
                isPublic,
                ownerIds: currentServer.ownerIds,
                memberIds: currentServer.memberIds,
            });
        } else {
            channel = await this.create({
                serverId,
                name,
                type,
                isPublic,
                ownerIds,
                memberIds,
            });
        }

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("add-channel-success");
        socket.to(channel.serverId).emit("add-channel-success");

        return channel;
    } catch (e) {
        console.error(`somthing went wrong in addChannel: ${e.message}`);
        return { error: e.message };
    }
};

channelSchema.statics.deleteChannel = async function (
    userId,
    channelId
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const deleteResponse = await this.deleteOne({
            _id: ObjectId(channelId),
            owerIds: { $in: memberId },
        });

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("delete-channel-success");
        socket.to(channel.serverId).emit("delete-channel-success");

        return deleteResponse;
    } catch (e) {
        console.error(`somthing went wrong in deleteChannel: ${e.message}`);
        return { error: e.message };
    }
};

channelSchema.statics.updateChannel = async function (
    userId,
    channelId,
    channelName
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $set: { name: channelName } }
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("update-channel-success");
        socket.to(channel.serverId).emit("update-channel-success");

        return updateResponse;
    } catch (e) {
        console.error(`somthing went wrong in updateChannel: ${e.message}`);
        return { error: e.message };
    }
};

channelSchema.statics.getChannelsByServerId = async function (serverId) {
    try {
        let channels = await this.findById(serverId)
            .populate({
                path: "memberIds",
                select: ["_id", "email", "name", "avatar"],
            })
            .populate({
                path: "ownerIds",
                select: ["_id", "email", "name", "avatar"],
            });

        return channels;
    } catch (e) {
        console.error(`something went wrong in getChannelByServerId: ${e.message}`);
        throw e.message;
    }
};

channelSchema.statics.deleteMembersByChannelId = async function (
    userId,
    channelId,
    memberIds
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const deleteResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { memberIds: { $in: memberIds } } }
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("delete-member-in-channel-success");
        socket.to(channel.serverId).emit("delete-member-in-channel-success");

        return deleteResponse;
    } catch (e) {
        console.error(
            `somthing went wrong in deleteMembersByChannelId: ${e.message}`
        );
        return { error: e.message };
    }
};

channelSchema.statics.updateMembersByChannelId = async function (
    userId,
    channelId,
    memberIds
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $addToSet: { memberIds: { $each: memberIds } } }
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("update-member-in-channel-success");
        socket.to(channel.serverId).emit("update-member-in-channel-success");

        return updateResponse;
    } catch (e) {
        console.error(`something went wront in updateMembersByChannelId:${e}`);
        throw e;
    }
};

channelSchema.statics.deleteOwnersByChannelId = async function (
    userId,
    channelId,
    ownerIds
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const deleteResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { ownerIds: { $in: ownerIds } } }
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("delete-owner-in-channel-success");
        socket.to(channel.serverId).emit("delete-owner-in-channel-success");

        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete members: ${e}`);
        return { error: e };
    }
};

channelSchema.statics.updateOwnersByChannelId = async function (
    userId,
    channelId,
    ownerIds
) {
    try {
        //checking if userId in ownerIds of channel 
        let channel = await this.findById(channelId).populate("ownerIds", "_id");
        if (!channel.ownerIds._id.includes(userId)) {
            return { error: "You may not have permisson." };
        }

        const updateResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $addToSet: { ownerIds: { $each: ownerIds } } }
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("update-owner-in-channel-success");
        socket.to(channel.serverId).emit("update-owner-in-channel-success");

        return updateResponse;
    } catch (e) {
        console.error(`something went wront in updateMembersByChannelId:${e}`);
        throw e;
    }
};

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;