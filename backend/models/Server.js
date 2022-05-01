import mongoose from "mongoose";
import Channel from "./Channel.js";

const serverSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    ownerIds: [mongoose.Types.ObjectId],
    memberIds: [mongoose.Types.ObjectId],
  },
  { timestamps: true }
);

serverSchema.statics.getServerById = async function (serverId) {
  try {
    const server = await this.findById(serverId);
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

serverSchema.statics.createServer = async function (
  name,
  avatar,
  userId,
  ownerIds,
  memberIds
) {
  try {
    ownerIds.push(userId);
    const newServer = await this.create({
      name,
      avatar,
      ownerIds,
      memberIds,
    });
    const newChannel = await Channel.addChannel(
      userId,
      newServer._id,
      "General",
      "type",
      newServer.ownerIds,
      newServer.memberIds
    );
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
    return removedMember;
  } catch (error) {
    console.error(`something went wrong in removeUsers: ${error.message}`);
    throw error;
  }
};

serverSchema.statics.grantOwner = function (serverId, userId, memberId) {
  try {
    const grantedOwner = this.updateOne(
      { _id: serverId, ownerIds: userId },
      {
        $addToSet: { ownerIds: memberId },
        $pull: { memberIds: memberId },
      }
    );
    if (grantedOwner.matchedCount === 0) {
      return { error: "User may not have permisson" };
    }
    return grantedOwner;
  } catch (error) {
    console.error(`something went wrong in grantOwner: ${error.message}`);
    throw error;
  }
};

serverSchema.statics.revokeOwner = function (serverId, userId, ownerId) {
  try {
    const revokedOwner = this.updateOne(
      { _id: serverId, ownerIds: userId },
      {
        $pull: { ownerIds: memberId },
        $addToSet: { memberIds: memberId },
      }
    );
    if (revokedOwner.matchedCount === 0) {
      return { error: "User may not have permisson" };
    }
    return revokedOwner;
  } catch (error) {
    console.error(`something went wrong in revokeOwner: ${error.message}`);
    throw error;
  }
};

export default mongoose.model("Server", serverSchema);
