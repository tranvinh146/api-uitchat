import mongoose from 'mongoose';
import User from './User.js';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ConversationSchema = new Schema({
    ConversationCode: {type: String, required: true},
    users: {type: Array, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true}
}, {
    _id: true,
});

ConversationSchema.statics.getConversationByUserId = async function (ownerId, conversationPerPage = 10) {
    try {
        const conversationsList = await this.find({ ConversationCode: {$regex: ownerId}}).sort({updatedAt: -1});
        console.log(`11111 ${ownerId}`)
        conversationsList.forEach((conversation) => {
            let member;
            conversation.users.forEach((user) => {
                if (user._id.toString() != ownerId) {
                    member = user;
                }
            });
            conversation.users = member;
        });
        const totalNumConversations = await this.count({ConversationCode: {$regex: ownerId}});
        return {conversationsList, totalNumConversations}; 
    } catch (e){
        console.error(`Something went wrong in getConversationByUserId: ${e}`);
        throw e;
    }
}

ConversationSchema.statics.addNewConversation = async function (ownerId, memberId) {
    try {

        const senderId = ownerId + memberId;
        const receiverId = memberId + ownerId;
        const member = await User.findOne({_id: memberId});
        if (member == null) {
            return {
                code: 400005,
                description: "User do not exist"};
        }

        let conversation = await this.findOne({
            $or: [
            {ConversationCode:  senderId},
            {ConversationCode:  receiverId}
        ]})

        if (!conversation){
            const owner = await User.findOne({_id: ownerId});
            const users = [owner, member];
            const createdAt = new Date();
            const updatedAt = new Date();
            const conversationId = senderId;
            conversation = await this.create({
                ConversationCode: conversationId,
                users: users,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
            return {status: "Created success conversation", conversation: conversation}; 
        } else {
            return {status: "The conversation has existed", conversation: conversation};
        }
    } catch (e){
        console.error(`Something went wrong in addNewConversation: ${e}`);
        throw e;
    }
}

export default mongoose.model('conversations', ConversationSchema);
