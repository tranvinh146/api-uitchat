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

const User = mongoose.model("User", userSchema);

export default User;
