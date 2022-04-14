import mongoose from "moongoose";

const channelSchema = new mongoose.Schema({
    severId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    channelName: {
        type: String,
        maxLength: 30,
        required: true
    },
    channelType: {
        type: String,
        required: true
    },
    userList: [mongoose.SchemaTypes.ObjectId],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

channelSchema.statics.getUsersByChannelId = await function (channelId) {
    try {
        let cursor = await channels.find({ _id: ObjectId(channelId) });
        let object = await cursor.toArray();
        return object[0].usersList;
    } catch (e) {
        console.error(`something went wrong in getUsersByChannelId: ${e}`);
        throw e;
    }
}

channelSchema.statics.deleteUsersByChannelId = await function (channelId, usersList) {
    try {
        const deleteResponse = await channels.updateOne(
            { _id: ObjectId(channelId) },
            { $pull: { usersList: { $in: usersList } } });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete users: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.addUsersByChannelId = await function (channelId, usersList, updatedAt) {
    try {
        const updateResponse = await channels.updateOne(
            { _id: ObjectId(channelId) },
            { $addToSet: { usersList: { $each: usersList } } },
            { $set: { updatedAt: updatedAt } }
        );
        return updateResponse;
    } catch (e) {
        console.error(`something went wront in updateUsersByChannelId:${e}`);
        throw e;
    }
}

channelSchema.statics.deleteChannel = await function (channelId) {
    try {
        const deleteResponse = await channels.deleteOne({
            _id: ObjectId(channelId),
        });
        return deleteResponse;
    } catch (e) {
        console.error(`unable to delete channel: ${e}`);
        return { error: e };
    }
}

channelSchema.statics.updateChannel = await function (channelId, channelName, updatedAt) {
    try {
        const updateResponse = await channels.updateOne(
            { _id: ObjectId(channelId) },
            { $set: { channelName: channelName, updatedAt: updatedAt } }
        );
        return updateResponse;
    } catch (e) {
        console.error(e.message);
    }
}

module.exports = mongoose.model("Channel", channelSchema)