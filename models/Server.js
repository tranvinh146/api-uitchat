import mongoose from "mongoose";
import Channel from "./Channel.js";
import User from "./User.js";

const serverSchema = new mongoose.Schema(
    {
        name: String,
        avatar: String,
        ownerIds: { type: [mongoose.Types.ObjectId], ref: "User" },
        memberIds: { type: [mongoose.Types.ObjectId], ref: "User" },
    },
    { timestamps: true }
);

serverSchema.statics.getServerById = async function (serverId) {
    try {
        const server = await this.findById(serverId)
            .populate({
                path: "memberIds",
                select: ["_id", "email", "name", "avatar"],
            })
            .populate({
                path: "ownerIds",
                select: ["_id", "email", "name", "avatar"],
            });
        return server;
    } catch (error) {
        console.error(`something went wrong in getServerById: ${error}`);
        throw error;
    }
};

serverSchema.statics.getServersByUserId = async function (userId) {
    try {
        const servers = await this.find({
            $or: [{ memberIds: userId }, { ownerIds: userId }],
        });
        return servers;
    } catch (error) {
        console.error(`something went wrong in getServerById: ${error}`);
        throw error;
    }
};

serverSchema.statics.createServer = async function (name, avatar, userId) {
    try {
        const newServer = await this.create({
            name,
            avatar,
            ownerIds: userId,
        });
        const newChannel = await Channel.addChannel(
            userId,
            newServer._id,
            "General",
            "type",
            true,
            newServer.ownerIds,
            newServer.memberIds
        );

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("create-server-success");
        socket.to(serverId).emit("create-server-success");

        return { server: newServer, channel: newChannel };
    } catch (error) {
        console.error(`something went wrong in createServer: ${error.message}`);
        throw error.message;
    }
};

serverSchema.statics.updateServer = async function (
    serverId,
    userId,
    ...updateValue
) {
    try {
        const updatedServer = await this.updateOne(
            {
                _id: serverId,
                ownerIds: userId,
            },
            ...updateValue
        );
        if (updatedServer.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("update-server-success");
        socket.to(serverId).emit("update-server-success");

        return updatedServer;
    } catch (error) {
        console.error(`something went wrong in createServer: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.deleteServer = async function (serverId, userId) {
    try {
        const deletedServer = await this.deleteOne({
            _id: serverId,
            ownerIds: userId,
        });
        console.log(deletedServer);
        if (deletedServer.deletedCount === 0) {
            return { error: "User may not have permisson" };
        }
        const deletedChannels = Channel.remove({ serverId });

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("delete-server-success");
        socket.to(serverId).emit("delete-server-success");

        return { deletedServer, deletedChannels };
    } catch (error) {
        console.error(`something went wrong in deleteServer: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.addMembers = async function (
    serverId,
    userId,
    // ownerIds,
    memberIds
) {
    try {
        const addedUsers = await this.updateOne(
            {
                _id: serverId,
                ownerIds: userId,
            },
            {
                $addToSet: {
                    // ownerIds: { $each: ownerIds },
                    memberIds: { $each: memberIds },
                },
            }
        );
        if (addedUsers.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }
        await Channel.updateOne(
            {
                serverId: serverId,
            },
            {
                $addToSet: {
                    // ownerIds: { $each: ownerIds },
                    memberIds: { $each: memberIds },
                },
            }
        );
        const addedUserInfos = await User.getUserInfoByIds(memberIds);

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("add-member-in-server-success");
        socket.to(serverId).emit("add-member-in-server-success");

        return addedUserInfos;
    } catch (error) {
        console.error(`something went wrong in addMembers: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.removeMembers = async function (
    serverId,
    userId,
    memberIds
) {
    try {
        const removedMember = await this.updateOne(
            {
                _id: serverId,
                ownerIds: userId,
            },
            {
                $pull: { memberIds: { $in: memberIds } },
            }
        );
        if (removedMember.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }
        await Channel.updateOne(
            {
                serverId: serverId,
            },
            {
                $pull: { memberIds: { $in: memberIds } },
            }
        );
        const removedUserInfos = await User.getUserInfoByIds(memberIds);
        return removedUserInfos;
    } catch (error) {
        console.error(`something went wrong in removeUsers: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.grantOwner = async function (serverId, userId, memberId) {
    try {
        const grantedOwner = this.updateOne(
            { _id: serverId, ownerIds: userId, memberIds: memberId },
            {
                $addToSet: { ownerIds: memberId },
                $pull: { memberIds: memberId },
            }
        );
        if (grantedOwner.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("grant-owner-success");
        socket.to(serverId).emit("grant-owner-success");

        return grantedOwner;
    } catch (error) {
        console.error(`something went wrong in grantOwner: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.revokeOwner = async function (serverId, userId, ownerId) {
    try {
        const revokedOwner = this.updateOne(
            { _id: serverId, ownerIds: userId, ownerIds: ownerId },
            {
                $pull: { ownerIds: ownerId },
                $addToSet: { memberIds: ownerId },
            }
        );
        if (revokedOwner.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }

        //get user socketId
        let socket = await User.findById(userId).socketId;

        //emit to frontend
        socket.emit("revoke-owner-success");
        socket.to(serverId).emit("revoke-owner-success");

        return revokedOwner;
    } catch (error) {
        console.error(`something went wrong in revokeOwner: ${error.message}`);
        throw error;
    }
};

export default mongoose.model("Server", serverSchema);
