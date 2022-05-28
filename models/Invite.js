import mongoose from "mongoose";
import Channel from "./Channel.js";
import Server from "./Server.js";
import User from "./User.js";

const inviteSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
    serverId: { type: mongoose.Types.ObjectId, ref: "Server" },
  },
  { timestamps: true }
);

inviteSchema.statics.getInvitesByUserId = async function (userId) {
  try {
    return await this.find({ receiverId: userId })
      .sort({ createdAt: "desc" })
      .populate({
        path: "senderId",
        select: ["_id", "name"],
      })
      .populate({
        path: "serverId",
        select: ["_id", "name"],
      });
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
    const createResponse = await this.create({
      senderId,
      receiverId,
      serverId,
    });
    const invite = await this.findById(createResponse._id)
      .populate({
        path: "receiverId",
        select: ["_id", "name"],
      })
      .populate({
        path: "senderId",
        select: ["_id", "name"],
      })
      .populate({
        path: "serverId",
        select: ["_id", "name"],
      });
    return invite;
  } catch (error) {
    console.error(`something went wrong in sendInvite: ${error.message}`);
    throw error;
  }
};

inviteSchema.statics.acceptInvite = async function (id, serverId, receiverId) {
  try {
    await this.deleteOne({ _id: id });
    const updateServer = await Server.updateOne(
      {
        _id: serverId,
      },
      {
        $addToSet: {
          memberIds: receiverId,
        },
      }
    );
    await Channel.updateMany(
      { serverId },
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

inviteSchema.statics.rejectInvite = async function (id) {
  try {
    await this.deleteOne({ _id: id });
    return { status: "success" };
  } catch (error) {
    console.error(`something went wrong in rejectInvite: ${error.message}`);
    throw error;
  }
};

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
