import mongoose from 'mongoose';
import Base64 from "../utils/Base64.js"
// import encrypt from 'mongoose-encryption'


const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const MessageSchema = new Schema({
    userId: {type: ObjectId, required: true},
    channelId: {type: String},
    conversationId: {type: String},
    content: {type: String, index: true, required: true},
}, {
    _id: true,
    timestamps: true
});

MessageSchema.statics.getMessageById = async function (messageId) {
    try {
        const messages = await this.aggregate([
            {
                $match: { _id: messageId}
            },
            {
            $lookup:{
                from: 'users', 
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
            }]).sort({createdAt: -1});
        messages.forEach((message) => message.content = Base64.decode(message.content));
        return messages; 
    } catch (e){
        console.error(`Something went wrong in getMessageById: ${e}`);
        throw e;
    }
}

MessageSchema.statics.getMessagesByChannelId = async function ( channelId, messagesPerPage = 20) {
    try {
         const messagesList = await this.aggregate([
            {
                $match: { channelId: channelId}
            },
            {
            $lookup:{
                from: 'users', 
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
            }]).sort({createdAt: -1});
        messagesList.forEach((message) => message.content = Base64.decode(message.content));
        const totalNumMessages = await this.count({channelId: channelId});
        return {messagesList, totalNumMessages};
    } catch (e){
        console.error(`Something went wrong in findByChannelId: ${e}`);
        throw e;
    }
}

MessageSchema.statics.getMessagesByConversationId = async function ( receiverId, senderId, messagesPerPage = 20) {
    try {
         const messagesList = await this.aggregate([
            {
                $match: {$or: [
                    {conversationId: receiverId},
                    {conversationId: senderId}
                ]}
            },
            {
            $lookup:{
                from: 'users', 
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
            }]).sort({createdAt: -1});
        messagesList.forEach((message) => message.content = Base64.decode(message.content));
        const totalNumMessages = await this.count({$or: [
            {conversationId: receiverId},
            {conversationId: senderId}
        ]});
        return {messagesList, totalNumMessages};
    } catch (e){
        console.error(`Something went wrong in findByChannelId: ${e}`);
        throw e;
    }
}

MessageSchema.statics.addMessageForChannel = async function (userId, channelId, content) {
    try {
        const contentBase64 = Base64.encode(content);
        this.create({
            userId: userId,
            channelId: channelId,
            content: contentBase64
        }, function(err){
            if(err) {
                console.error(err);
            }   
        });

        const message = await this.find({
            userId: userId,
            channelId: channelId,
            content: contentBase64}).sort({createdAt: -1});
        
        return {status: "Created success message", messageId: message[0]._id};
    } catch (e) {
        console.error(`Something went wrong in addMessageForConversation: ${e}`);
        throw e;
    }
}

MessageSchema.statics.addMessageForConversation = async function (userId, conversationId, content) {
    try {
        const contentBase64 = Base64.encode(content);
        this.create({
            userId: userId,
            conversationId: conversationId,
            content: contentBase64
        }, function(err){
            if(err) {
                console.error(err);
            }   
        });
        const message = await this.find({
            userId: userId,
            conversationId: conversationId,
            content: contentBase64}).sort({createdAt: -1});

        return {status: "Created success message", messageId: message[0]._id};
    } catch (e) {
        console.error(`Something went wrong in addMessageForConversation: ${e}`);
        throw e;
    }
}

MessageSchema.statics.updateMessage = async function (messageId,userId, content) {
    try {
        const contentBase64 = Base64.encode(content);
        this.updateOne({_id: messageId, userId: userId}, {content: contentBase64}, function (err){
            if(err) {
                console.error(err);
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
                console.error(err);
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
        messagesList.forEach((message) => message.content = Base64.decode(message.content));
        const totalNumMessages = await this.count(query);
        return {messagesList, totalNumMessages};
    } catch (e) {
        console.error(`Something went wrong in searchMessage: ${e}`);
        throw e;
    }
}

MessageSchema.statics.isOwnerMessage = async function (messageId, userId) {
    try {
        const result = await this.find({_id: messageId});
        const message = result[0];
        if (userId == message.userId.toString())
            return true;
        else {
            return false;
        }
    } catch (e) {
        console.error(`Something went wrong in searchMessage: ${e}`);
        throw e;
    }
}


export default mongoose.model('messages', MessageSchema);
