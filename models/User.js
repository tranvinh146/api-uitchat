import mongoose from "mongoose";
import Server from "./Server.js";
import Invitation from "./Invite.js";
import Contact from "./Contact.js";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String, 
    avatar: String,
  },
  { timestamps: true }
);

userSchema.statics.getAllUsersInfo = async () => {
  try {
    const users = await User.find({}, "email name avatar");
    return users;
  } catch (error) {
    console.error(`something went wrong in getAllUsersInfo: ${error.message}`);
    throw error;
  }
};

userSchema.statics.getUserInfoByIds = async (userIds) => {
  try {
    const users = await User.find(
      { _id: { $in: userIds } },
      "_id email name avatar"
    );
    return users;
  } catch (error) {
    console.error(`something went wrong in getAllUsersInfo: ${error.message}`);
    throw error;
  }
};

userSchema.statics.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(`something went wrong in findByEmail: ${error.message}`);
    throw error;
  }
};

userSchema.statics.getUsersByServerId = async (serverId) => {
  try {
    const server = await Server.findById(serverId);
    const userIds = server.ownerIds.concat(server.memberIds);
    return await User.find({ _id: { $in: userIds } }, "_id email name avatar");
  } catch (error) {
    console.error(
      `something went wrong in getUsersByServerId: ${error.message}`
    );
    throw error;
  }
};

userSchema.statics.getMembersByServerId = async (serverId) => {
  try {
    const server = await Server.findById(serverId);
    const memberIds = server.memberIds;
    return await User.find(
      { _id: { $in: memberIds } },
      "_id email name avatar"
    );
  } catch (error) {
    console.error(
      `something went wrong in getMembersByServerId: ${error.message}`
    );
    throw error;
  }
};

userSchema.statics.createUser = async function (email, password, name, avatar) {
  try {
    const existUser = await this.findOne({ email });
    if (existUser) {
      return { error: "Email exists" };
    }
    const newUser = await this.create({
      email,
      password,
      name,
      avatar,
    });
    await Contact.create({ userId: newUser._id });
    return newUser;
  } catch (error) {
    console.error(`something went wrong in createUser: ${error.message}`);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
