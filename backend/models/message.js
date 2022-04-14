import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MessageSchema = new Schema({
    userId: {type: String, required: true},
    channelId: {type: String, required: true},
    content: {type: String, index: true, required: true},
}, {
    _id: true,
    timestamps: true
});

MessageSchema.statics.findByChannelId = async function (channelId) {
    try {
        const messagesList = await this.find({channelId: channelId}).sort({createdAt: -1});
        const totalNumMessages = await this.count({channelId: channelId});
        return {messagesList, totalNumMessages};
    } catch (e){
        console.error(`Something went wrong in findByChannelId: ${e}`);
        throw e;
    }
}

MessageSchema.statics.addMessage = async function (userId, channelId, content) {
    try {
        this.create({
            userId: userId,
            channelId: channelId,
            content:content
        }, function(err){
            if(err) {
                handleError(err);
            }   
        });
        return {status: "Created success message"};
    } catch (e) {
        console.error(`Something went wrong in addMessage: ${e}`);
        throw e;
    }
}

MessageSchema.statics.updateMessage = async function (messageId,userId, content) {
    try {
        this.updateOne({_id: messageId, userId: userId}, {content: content}, function (err){
            if(err) {
                handleError(err);
            }  
        })
        return {status: "Updated success message"};
    } catch (e) {
        console.error(`Something went wrong in updateMessage: ${e}`);
        throw e;
    }
}

MessageSchema.statics.deleteMessage = async function (messageId, userId) {
    try {
        this.deleteOne({_id: messageId, userId: userId}, function (err){
            if(err) {
                handleError(err);
            }  
        })
        return {status: "Deleted success message"};
    } catch (e) {
        console.error(`Something went wrong in deleteMessage: ${e}`);
        throw e;
    }
}

MessageSchema.statics.searchMessage = async function (channelId, userId, searchText) {
    try {
        let query = searchText != "" 
        ? {channelId: channelId, $text: {$search: searchText}} 
        : {channelId: channelId, userId: userId};
        const messagesList = await this.find(query).sort({createdAt: -1});
        const totalNumMessages = await this.count(query);
        return {messagesList, totalNumMessages};
    } catch (e) {
        console.error(`Something went wrong in searchMessage: ${e}`);
        throw e;
    }
}


export default mongoose.model('messages', MessageSchema);
