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
  name,
  avatar
) {
  try {
    const updatedServer = this.updateOne(
      {
        _id: serverId,
      },
      { name, avatar }
    );
    return updatedServer;
  } catch (error) {
    console.error(`something went wrong in createServer: ${error}`);
    throw error;
  }
};

serverSchema.statics.deleteServer = async function (serverId, userId) {};

export default mongoose.model("Server", serverSchema);
