import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    avatar: String,
    status: String,
    serverIds: [mongoose.Types.ObjectId],
    isAdmin: Boolean,
  },
  { timestamps: true }
);

userSchema.statics.getAllUsers = async function () {
  try {
    return this.find({}, "_id email name");
  } catch (error) {
    console.error(`something went wrong in getAllUsers: ${error.message}`);
    throw error;
  }
};

userSchema.statics.findByCredential = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.error(`something went wrong in findByCredential: ${err.message}`);
    throw err;
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
    if (user.serverIds.includes(serverId)) {
      throw Error("Already joined this server.");
    } else {
      user.serverIds.push(serverId);
      user.save();
    }
  } catch (error) {
    console.error(`Unable to join server, ${error.message}`);
    throw error;
  }
};

userSchema.statics.searchUsers = async function (textSearching) {
  try {
    let regexText = "^" + textSearching + "|\\s" + textSearching;
    const users = await User.find(
      {
        $or: [
          { email: { $regex: regexText, $options: "i" } },
          { name: { $regex: regexText, $options: "i" } },
        ],
      },
      "_id email name avatar"
    ).limit(5);
    console.log(users);
    return users;
  } catch (error) {
    console.error(`Something wennt wrong in searchUser, ${error.message}`);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
