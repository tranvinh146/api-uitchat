import mongoose from "mongoose";
import Channel from "./Channel.js";

const serverSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    channelIds: [mongoose.Types.ObjectId],
    adminIds: [mongoose.Types.ObjectId],
    userIds: [mongoose.Types.ObjectId],
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
      $or: [{ userIds: userId }, { adminIds: userId }],
    });
    return servers;
  } catch (error) {
    console.error(`something went wrong in getServerById: ${error}`);
    throw error;
  }
};

serverSchema.statics.createServer = async function (name, avatar, userId) {
  try {
    let newServer = this.create({
      name,
      avatar,
      adminIds: userId,
    });
    // this.updateOne(
    //   { _id: newServer._id },
    //   { channelIds: { $push: { channelIds: "6249a36ebc8788e6132e86c3" } } }
    // );
    // Channel.createChannel(newServer._id);
    // newServer = this.getServerById(newServer._id);
    return newServer;
  } catch (error) {
    console.error(`something went wrong in createServer: ${error}`);
    throw error;
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
        adminIds: userId,
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
      adminIds: userId,
    });
    console.log(deletedServer);
    if (deletedServer.deletedCount === 0) {
      return { error: "User may not have permisson" };
    }
    return deletedServer;
  } catch (error) {
    console.error(`something went wrong in deleteServer: ${error.message}`);
    throw error;
  }
};

serverSchema.statics.addUsers = async function (serverId, adminId, userIds) {
  try {
    const addedUsers = await this.updateOne(
      {
        _id: serverId,
        adminIds: adminId,
      },
      {
        $addToSet: { userIds: { $each: userIds } },
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

serverSchema.statics.removeUsers = async function (serverId, adminId, userIds) {
  try {
    const removedUsers = await this.updateOne(
      {
        _id: serverId,
        adminIds: adminId,
      },
      {
        $pull: { userIds: { $in: userIds } },
      }
    );
    if (removedUsers.matchedCount === 0) {
      return { error: "User may not have permisson" };
    }
    return removedUsers;
  } catch (error) {
    console.error(`something went wrong in removeUsers: ${error.message}`);
    throw error;
  }
};

serverSchema.statics.addChannel = async function (serverId, channelId) {
  this.updateOne(
    { _id: serverId },
    { channelIds: { $push: { channelIds: channelId } } }
  );
};

export default mongoose.model("Server", serverSchema);
