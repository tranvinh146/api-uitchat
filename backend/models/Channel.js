import mongoose from "mongoose";

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
    type: {
      type: String,
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
  serverId,
  name,
  type,
  avatar,
  ownerIds,
  memberIds
) {
  try {
    const channel = await this.create({
      serverId,
      name,
      type,
      avatar,
      ownerIds,
      memberIds,
    });
    return channel;
  } catch (e) {
    console.error(`unable to add channel: ${e}`);
    return { error: e };
  }
};

channelSchema.statics.deleteChannel = async function (channelId, userId) {
  try {
    const deleteResponse = await this.deleteOne({
      _id: ObjectId(channelId),
      owerIds: { $in: userId },
    });
    return deleteResponse;
  } catch (e) {
    console.error(`unable to delete channel: ${e}`);
    return { error: e };
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
    console.error(e.message);
  }
};

channelSchema.statics.getChannelsByServerId = async function (serverId) {
  try {
    let channels = await this.find({ serverId: ObjectId(serverId) });
    return channels;
  } catch (e) {
    console.error(`something went wrong in getChannelByServerId: ${e}`);
    throw e;
  }
};

<<<<<<< HEAD
channelSchema.statics.getChannel = async function (channelId) {
    try {
        let channel = await this.find({ _id: ObjectId(channelId) });
        return channel;
    } catch (e) {
        console.error(`something went wrong in getChannel: ${e}`);
        throw e;
    }
}

channelSchema.statics.deleteUsersByChannelId = async function (channelId, usersList) {
    try {
        const deleteResponse = await this.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { usersList: { $in: usersList } } });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete users: ${e}`);
        return { error: e };
    }
}
=======
channelSchema.statics.deleteUsersByChannelId = async function (
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
    console.error(`unable to delete users: ${e}`);
    return { error: e };
  }
};
>>>>>>> 66c292e6b71519c96c48db38279014b1c46fd373

channelSchema.statics.updateUsersByChannelId = async function (
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
    console.error(`something went wront in updateUsersByChannelId:${e}`);
    throw e;
  }
};

channelSchema.statics.deleteLeadersByChannelId = async function (
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
    console.error(`unable to delete users: ${e}`);
    return { error: e };
  }
};

channelSchema.statics.updateLeadersByChannelId = async function (
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
    console.error(`something went wront in updateUsersByChannelId:${e}`);
    throw e;
  }
};

export default mongoose.model("Channel", channelSchema);
