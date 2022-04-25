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
      required: true,
    },
    ownerIds: [mongoose.SchemaTypes.ObjectId],
    memberIds: [mongoose.SchemaTypes.ObjectId],
  },
  {
    timestamps: true,
  }
);

channelSchema.statics.addChannel = async function (
  userId,
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
    if (!ownersServer.include(userId)) {
      return { error: "You may be not permission." };
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

channelSchema.statics.deleteChannel = async function (channelId, memberId) {
  try {
    const deleteResponse = await this.deleteOne({
      _id: ObjectId(channelId),
      owerIds: { $in: memberId },
    });
    return deleteResponse;
  } catch (e) {
    console.error(`somthing went wrong in deleteChannel: ${e.message}`);
    return { error: e.message };
  }
};

channelSchema.statics.updateChannel = async function (channelId, channelName) {
  try {
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
  channelId,
  memberIds
) {
  try {
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
  channelId,
  memberIds
) {
  try {
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
  channelId,
  ownerIds
) {
  try {
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
  channelId,
  ownerIds
) {
  try {
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
