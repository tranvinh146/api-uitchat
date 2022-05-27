import mongoose from "mongoose";
import Server from "./Server.js";
import User from "./User.js";

const inviteSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
    serverId: { type: mongoose.Types.ObjectId, ref: "Server" },
    waiting: { type: Boolean, default: true },
    isAccept: { type: Boolean, default: false },
  },
  { timestamps: true }
);

inviteSchema.statics.getInviteByUserId = async function (userId) {
  try {
    return await this.find({ userId });
  } catch (error) {
    console.error(
      `something went wrong in getInviteByUserId: ${error.message}`
    );
    throw error;
  }
};

inviteSchema.statics.sendInvite = async function (
  senderId,
  receiverId,
  serverId
) {
  try {
    // check if invite has existed
    const exists = await this.findOne({
      senderId,
      receiverId,
      serverId,
    });
    if (exists) {
      return;
    }
    // add invite to db
    await this.create({ senderId, receiverId, serverId });
    return { status: "success" };
  } catch (error) {
    console.error(`Unable to add invite, ${error.message}`);
    throw error;
  }
};

inviteSchema.statics.acceptInvite = async function (
  senderId,
  receiverId,
  serverId
) {
  try {
    await this.update(
      { senderId, receiverId, serverId },
      { $set: { waiting: false, isAccept: true } }
    );
    const updateServer = await Server.updateOne(
      {
        _id: serverId,
        ownerIds: senderId,
      },
      {
        $addToSet: {
          memberIds: receiverId,
        },
      }
    );
    return updateServer;
  } catch (error) {
    console.error(`something went wrong in acceptInvite: ${error.message}`);
    throw error;
  }
};

inviteSchema.statics.rejectInvite = async function (
  senderId,
  receiverId,
  serverId
) {
  try {
    await this.update(
      { senderId, receiverId, serverId },
      { $set: { waiting: false, isAccept: false } }
    );
    return { status: "success" };
  } catch (error) {
    console.error(`something went wrong in rejectInvite: ${error.message}`);
    throw error;
  }
};

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
