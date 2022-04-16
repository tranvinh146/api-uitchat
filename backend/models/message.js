import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption'


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

// var encKey = process.env.ENCRYPT_ENCKEY;
// var sigKey = process.env.ENCRYPT_SIGKEY;

// MessageSchema.plugin(encrypt, { 
//     encryptionKey: "rc+XAekzWChg+tLdzZrDM+sbxLuzyJsSOU7D/P2pzAI=", 
//     signingKey: "0F8d59lz5pGv9q2RqqfZRa+EQEETa22jLq8hFnyyZkWkRgqM50Ec57GhDcPxo+i3HYzs0fABtwJ3CWMuelZXiA==", 
//     encryptedFields: ['content'] ,
//     collectionId: 'messages'
// });

MessageSchema.statics.getMessageById = async function (messageId) {
    try {
        const message = await this.find({_id: messageId});
        const response = await this.find({_id: messageId});
        // const message = response.decrypt(function(err) {
        //     if (err) { return handleError(err); }
        //     console.log(response);
        //     ;});
        return message ? message[0]: null;
    } catch (e){
        console.error(`Something went wrong in getMessageById: ${e}`);
        throw e;
    }
}

MessageSchema.statics.getMessagesByChannelId = async function (userId, channelId, messagesPerPage = 20) {
    try {
        const messagesList  = await this.find({channelId: channelId}).limit(messagesPerPage).sort({createdAt: -1});

        //  const messagesList = await this.aggregate([
        //     {
        //         $match: { channelId: channelId}
        //     },
        //     {
        //     $lookup:{
        //         from: 'users', 
        //         localField: userId,
        //         foreignField: '_id',
        //         as: 'user'
        //     }
        //     }]).sort({createdAt: -1});
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
                console.error(err);
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
        if (userId == message.userId)
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
