import mongoose from "mongoose";
import Server from "./Server.js";
import Invitation from "./Invite.js";

const userSchema = new mongoose.Schema(
  {
    // uid: String,
    email: String,
    password: String,
    name: String, //
    avatar: {
      type: String,
      default:
        "https://cdn.discordapp.com/attachments/952774183899791434/973252456899309648/default-avatar.png",
    },
    status: { type: String, default: "offline" },
    // socketId: String,
    serverIds: [mongoose.Types.ObjectId],
    // invitationIds: { type: [mongoose.Types.ObjectId], ref: "Invitation" },
    // friendIds: [mongoose.Types.ObjectId],
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
    return newUser;
  } catch (error) {
    console.error(`something went wrong in createUser: ${error.message}`);
    throw error;
  }
};

userSchema.statics.joinServer = async function (userId, serverId) {
  try {
    const user = await User.findById(userId);
    serverId = mongoose.Types.ObjectId(serverId);
    userId = mongoose.Types.ObjectId(userId);

    if (user.serverIds.includes(serverId)) {
      throw Error("Already joined this server.");
    } else {
      user.serverIds.push(serverId);
      user.save();

      const server = await Server.findById(serverId);
      server.memberIds.push(userId);
      server.save();
    }
  } catch (error) {
    console.error(`Unable to join server, ${error.message}`);
    throw error;
  }
};

userSchema.statics.getInvitations = async function (userId) {
  try {
    const user = await User.findById(userId).populate({
      path: "invitationIds",
      populate: {
        path: "senderId receiverId serverId",
        select: "name avatar",
      },
    });
    const invitations = user.invitationIds;
    return invitations;
  } catch (error) {
    console.error(`Unable to get invitations list, ${error.message}`);
    throw error;
  }
};

// userSchema.statics.getFriendsList = async function (userId) {
// 	try {
// 		const user = await User.findById(userId);
// 		const friendIds = user.friendIds;
// 		return await User.find({ _id: { $in: friendIds } }, "_id email name avatar");
// 	} catch (error) {
// 		console.error(`Unable to get friends list, ${error.message}`);
// 		throw error;
// 	}
// };

// userSchema.statics.addFriend = async function (userId, friendId) {
// 	try {
// 		const user = await User.findById(userId);
// 		friendId = mongoose.Types.ObjectId(friendId);

// 		if (user.friendIds.includes(friendId)) {
// 			throw Error("This person has already been in your friends list.");
// 		} else {
// 			user.friendIds.push(friendId);
// 			user.save();
// 		}
// 	} catch (error) {
// 		console.error(`Unable to add friend, ${error.message}`);
// 		throw error;
// 	}
// };

const User = mongoose.model("User", userSchema);

export default User;
