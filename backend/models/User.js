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
<<<<<<< HEAD
  } catch (err) {
    console.error(`something went wrong in findByCredential: ${err.message}`);
    throw err;
=======
  } catch (error) {
    console.error(`Unable to find user, ${error.message}`);
    throw error;
>>>>>>> 66c292e6b71519c96c48db38279014b1c46fd373
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
<<<<<<< HEAD
    console.error(`something went wrong in createUser: ${error.message}`);
=======
    console.error(`Unable to register: ${error.message}`);
>>>>>>> 66c292e6b71519c96c48db38279014b1c46fd373
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
