import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String, // image url
    adminIds: [mongoose.Types.ObjectId], // admin is an ObjectId array
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
    const newServer = this.create({
      name,
      avatar,
      adminIds: userId,
    });
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
        $push: { userIds: { $each: userIds } },
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

export default mongoose.model("Server", serverSchema);
