import mongoose from "mongoose";
import Server from "./Server.js";
import User from "./User.js";

const channelSchema = new mongoose.Schema(
  {
    serverId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Server",
    },
    name: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["text", "voice"],
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
    let currentServer = await Server.findById(serverId);
    // if (!currentServer.ownerIds.includes(userId)) {
    //   return { error: "You may not have permisson." };
    // }
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
    console.log(channel)
    return channel;
  } catch (e) {
    console.error(`somthing went wrong in addChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.deleteChannel = async function (userId, channelId) {
  try {
    // let channel = await this.findById(channelId);
    // if (!channel.ownerIds.includes(userId)) {
    //   return { error: "You may not have permisson." };
    // }

    const deletedChannel = await this.findById(channelId);
    
    await this.deleteOne({
      _id: channelId,
      // owerIds: userId,
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
    let channel = await this.findById(channelId);
    // if (!channel.ownerIds.includes(userId)) {
    //   return { error: "You may not have permisson." };
    // }
    const updateResponse = await this.updateOne(
      { _id: channelId },
      { $set: { name: channelName } }
    );
    return updateResponse;
  } catch (e) {
    console.error(`somthing went wrong in updateChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.getChannelsByServerId = async function (serverId) {
  try {
    let channels = await this.find({ serverId })
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
    let channel = await this.findById(channelId);
    if (!channel.ownerIds.includes(userId)) {
      return { error: "You may not have permisson." };
    }

    const deleteResponse = await this.updateOne(
      { _id: ObjectId(channelId) },
      { $pull: { memberIds: { $in: memberIds } } }
    );

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
    let channel = await this.findById(channelId);
    if (!channel.ownerIds.includes(userId)) {
      return { error: "You may not have permisson." };
    }

    const updateResponse = await this.updateOne(
      { _id: ObjectId(channelId) },
      { $addToSet: { memberIds: { $each: memberIds } } }
    );

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
    let channel = await this.findById(channelId);
    if (!channel.ownerIds.includes(userId)) {
      return { error: "You may not have permisson." };
    }

    const deleteResponse = await this.updateOne(
      { _id: ObjectId(channelId) },
      { $pull: { ownerIds: { $in: ownerIds } } }
    );

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
    let channel = await this.findById(channelId);
    if (!channel.ownerIds.includes(userId)) {
      return { error: "You may not have permisson." };
    }

    const updateResponse = await this.updateOne(
      { _id: ObjectId(channelId) },
      { $addToSet: { ownerIds: { $each: ownerIds } } }
    );

    return updateResponse;
  } catch (e) {
    console.error(`something went wront in updateMembersByChannelId:${e}`);
    throw e;
  }
};

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
