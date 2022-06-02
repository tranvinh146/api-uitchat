import mongoose from "mongoose";
import Base64 from "../utils/Base64.js";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const MessageSchema = new Schema(
  {
    userId: { type: ObjectId, required: true, ref: "User" },
    channelId: { type: String },
    content: { type: String, index: true, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    _id: true,
    timestamps: true,
  }
);

MessageSchema.statics.getMessageById = async function (messageId) {
  try {
    const message = await this.findById(messageId).populate({
      path: "userId",
      select: ["_id", "email", "name", "avatar"],
    });
    message.content = Base64.decode(message.content);
    return message;
  } catch (e) {
    console.error(`Something went wrong in getMessageById: ${e}`);
    throw e;
  }
};

MessageSchema.statics.getMessagesByChannelId = async function (
  channelId,
  messagesPerPage = 20,
  page = 0
) {
  try {
    const messagesList = await this.aggregate([
      {
        $match: { channelId: channelId },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      // { $skip: page * messagesPerPage },
      // { $limit: messagesPerPage },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          "userId.password": 0,
          "userId.createdAt": 0,
          "userId.updatedAt": 0,
          "userId.status": 0,
          "userId.__v": 0,
          "userId.serverIds": 0,
        },
      },
    ]);
    messagesList.forEach(
      (message) => (message.content = Base64.decode(message.content))
    );
    const totalNumMessages = await this.count({ channelId: channelId });
    return { messagesList, totalNumMessages };
  } catch (e) {
    console.error(`Something went wrong in findByChannelId: ${e}`);
    throw e;
  }
};

MessageSchema.statics.addMessageForChannel = async function (
  userId,
  channelId,
  content
) {
  try {
    const contentBase64 = Base64.encode(content);
    const newMessage = await this.create({
      userId: userId,
      channelId: channelId,
      content: contentBase64,
    });
    const message = await this.getMessageById(newMessage._id);
    return message;
  } catch (e) {
    console.error(`Something went wrong in addMessage: ${e}`);
    throw e;
  }
};

MessageSchema.statics.updateMessage = async function (
  messageId,
  userId,
  content
) {
  try {
    const contentBase64 = Base64.encode(content);
    await this.updateOne(
      { _id: messageId, userId: userId },
      { content: contentBase64 }
    );
    const message = await this.getMessageById(messageId);
    return message;
  } catch (e) {
    console.error(`Something went wrong in updateMessage: ${e}`);
    throw e;
  }
};

MessageSchema.statics.deleteMessage = async function (messageId, userId) {
  try {
    const deleteResponse = await this.updateOne(
      { _id: messageId, userId: userId },
      { deleted: true }
    );
    return deleteResponse;
  } catch (e) {
    console.error(`Something went wrong in deleteMessage: ${e}`);
    throw e;
  }
};

MessageSchema.statics.searchMessage = async function (
  channelId,
  userId,
  searchText
) {
  try {
    let query =
      searchText != ""
        ? { channelId: channelId, $text: { $search: searchText } }
        : { channelId: channelId, userId: userId };
    const messagesList = await this.find(query).sort({ createdAt: -1 });
    messagesList.forEach(
      (message) => (message.content = Base64.decode(message.content))
    );
    const totalNumMessages = await this.count(query);
    return { messagesList, totalNumMessages };
  } catch (e) {
    console.error(`Something went wrong in searchMessage: ${e}`);
    throw e;
  }
};

export default mongoose.model("messages", MessageSchema);
