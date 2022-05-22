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
        //emit to frontend
        io.to(newServer._id).emit("add-server-success");

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
        //emit to frontend
        io.to(serverId).emit("update-server-success");

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
        //emit to frontend
        io.to(serverId).emit("delete-server-success");

        return { deletedServer, deletedChannels };
    } catch (error) {
        console.error(`something went wrong in deleteServer: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.addUsers = async function (
    serverId,
    userId,
    ownerIds,
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
                    ownerIds: { $each: ownerIds },
                    memberIds: { $each: memberIds },
                },
            }
        );

        if (addedUsers.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }
        //emit to frontend
        io.to(serverId).emit("add-user-in-server-success");

        return addedUsers;
    } catch (error) {
        console.error(`something went wrong in addUsers: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.removeMember = async function (
    serverId,
    userId,
    memberId
) {
    try {
        const removedMember = await this.updateOne(
            {
                _id: serverId,
                ownerIds: userId,
            },
            {
                $pull: { memberIds: { $in: memberId } },
            }
        );
        if (removedMember.matchedCount === 0) {
            return { error: "User may not have permisson" };
        }
        //emit to frontend
        io.to(serverId).emit("remove-member-in-server-success");

        return removedMember;
    } catch (error) {
        console.error(`something went wrong in removeUsers: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.grantOwner = function (serverId, userId, memberId) {
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
        //emit to frontend
        io.to(serverId).emit("grant-owner-in-server-success");

        return grantedOwner;
    } catch (error) {
        console.error(`something went wrong in grantOwner: ${error.message}`);
        throw error;
    }
};

serverSchema.statics.revokeOwner = function (serverId, userId, ownerId) {
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
        //emit to frontend
        io.to(serverId).emit("revoke-owner-in-server-success");

        return revokedOwner;
    } catch (error) {
        console.error(`something went wrong in revokeOwner: ${error.message}`);
        throw error;
    }
};

const Server = mongoose.model("Server", serverSchema)
export default Server;
