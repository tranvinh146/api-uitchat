import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    avatar: String,
    status: String,
    serverIds: [mongoose.Types.ObjectId],
}, { timestamps: true });

userSchema.statics.findByCredential = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (err) {
        console.error(`Unable to find user, ${err}`);
        return;
    }
}

const User = mongoose.model('User', userSchema);

export default User;