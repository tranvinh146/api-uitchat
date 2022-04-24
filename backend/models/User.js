import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    avatar: String,
    status: String,
    serverIds: [mongoose.Types.ObjectId],
    isAdmin: Boolean,
  },
  { timestamps: true }
);

userSchema.statics.findByCredential = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(`Unable to find user, ${error.message}`);
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
    console.error(`Unable to register: ${error.message}`);
    throw error;
  }
};

userSchema.statics.joinServer = async function (userId, serverId) {
  try {
    const user = await User.findById(userId);
    if (user.serverIds.includes(serverId)) {
      throw Error("Already joined this server.")
    }
    else {
      user.serverIds.push(serverId);
      user.save();
    }
  } catch (error) {
    console.error(`Unable to join server, ${error.message}`);
    throw error;
  }
}

const User = mongoose.model("User", userSchema);

export default User;
