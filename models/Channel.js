import mongoose from "mongoose";
import Server from "./Server.js";

const channelSchema = new mongoose.Schema(
  {
    serverId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
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
    let channel;
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
    }
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
    return channel;
  } catch (e) {
    console.error(`somthing went wrong in addChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.deleteChannel = async function (
  userId,
  serverId,
  channelId
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
    }
    const deleteResponse = await this.deleteOne({
      _id: ObjectId(channelId),
    });
    return deleteResponse;
  } catch (e) {
    console.error(`somthing went wrong in deleteChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.updateChannel = async function (
  userId,
  serverId,
  channelId,
  channelName
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
    }
    const updateResponse = await this.updateOne(
      { _id: ObjectId(channelId) },
      { $set: { name: channelName } }
    );
    return updateResponse;
  } catch (e) {
    console.error(`somthing went wrong in updateChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.getChannelById = async function (channelId, userId) {
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

channelSchema.statics.getChannelsByServerId = async function (serverId) {
  try {
    let channels = await this.find({ serverId });
    return channels;
  } catch (e) {
    console.error(`something went wrong in getChannelByServerId: ${e.message}`);
    throw e.message;
  }
};

channelSchema.statics.deleteMembersByChannelId = async function (
  userId,
  serverId,
  channelId,
  memberIds
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
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
  serverId,
  channelId,
  memberIds
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
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
  serverId,
  channelId,
  ownerIds
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
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
  serverId,
  channelId,
  ownerIds
) {
  try {
    let currentServer = await Server.findById(serverId);
    let ownersServer = currentServer.ownerIds;
    if (!ownersServer.includes(userId)) {
      return { error: "You may not have permission." };
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

export default mongoose.model("Channel", channelSchema);
