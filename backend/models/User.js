import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    // avatar: String,
    status: String,
    createAt: String,
    isAdmin: Boolean,
});

userSchema.statics.findByCredentials = async (username, password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const response = await User.findOne({
            username: username,
            password: hashedPassword,
        });
        res.status(200).json(response);
    } catch (err) {
        console.error(`Unable to find user, ${err}`);
        res.status(500).json({
            error: `Unable to find user, ${err}`,
        });
    }
}

const User = mongoose.model('User', userSchema);


export default User;