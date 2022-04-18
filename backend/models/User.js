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

userSchema.statics.findByCredential = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (err) {
    console.error(`Unable to find user, ${err.message}`);
    throw err;
  }
};

userSchema.statics.createUser = async function (email, password, name, avatar) {
  try {
    const existUser = await this.findOne({ email });
    if (existUser) {
      throw Error("Email exists");
    }
    const newUser = await this.create({
      email,
      password,
      name,
      avatar,
    });
    return newUser;
  } catch (error) {
    console.error(`Unable to register: ${err.message}`);
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
