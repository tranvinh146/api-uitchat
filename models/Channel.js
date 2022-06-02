import mongoose from "mongoose";
import Server from "./Server.js";
import User from "./User.js";

const channelSchema = new mongoose.Schema(
  {
    serverId: {
      type: mongoose.Types.ObjectId,
      ref: "Server",
    },
    name: String,
  },
  {
    timestamps: true,
  }
);

channelSchema.statics.getChannelById = async function (channelId) {
  try {
    return await this.findById(channelId);
  } catch (error) {
    console.error(`something went wrong in getChannelById: ${error}`);
    throw error;
  }
};

channelSchema.statics.addChannel = async function (userId, serverId, name) {
  try {
    const isOwner = await Server.findOne({
      _id: serverId,
      ownerIds: userId,
    });

    if (!isOwner) {
      throw new Error("User may not have permission");
    }

    const channel = await this.create({
      serverId,
      name,
    });

    return channel;
  } catch (e) {
    console.error(`somthing went wrong in addChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.deleteChannel = async function (userId, channelId) {
  try {
    const deletedChannel = await this.findById(channelId);
    const isOwner = await Server.findOne({
      _id: deletedChannel.serverId,
      ownerIds: userId,
    });

    if (!isOwner) {
      throw new Error("User may not have permission");
    }

    await this.deleteOne({
      _id: channelId,
    });

    return deletedChannel;
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
    const updatedChannel = await this.findById(channelId);
    const isOwner = await Server.findOne({
      _id: updatedChannel.serverId,
      ownerIds: userId,
    });

    if (!isOwner) {
      throw new Error("User may not have permission");
    }

    await this.updateOne({ _id: channelId }, { $set: { name: channelName } });
    return updatedChannel;
  } catch (e) {
    console.error(`somthing went wrong in updateChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.getChannelsByServerId = async function (serverId) {
  try {
    const channels = await this.find({ serverId });
    console.log(channels);
    return channels;
  } catch (e) {
    console.error(`something went wrong in getChannelByServerId: ${e.message}`);
    throw e.message;
  }
};

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
