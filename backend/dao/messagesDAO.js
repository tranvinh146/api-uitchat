import { ObjectId } from "mongodb";

let messages;

export default class MessagesDAO {
    static async injectDB(conn) {
        if (messages) {
            return;
        }
        try {
            messages = await conn.db(process.env.UITCHAT_NS).collection('messages');
        } catch (e) {
            console.error(`unable to connect in MessagesDAO: ${e}`);
        }
    }

    static async getMessagesByChannelId(channelId) {
        let cursor;
        try {
            cursor = await messages.find({ channelId: channelId});
            const messagesList = await cursor.toArray();
            return messagesList;
          } catch (error) {
            console.error(`something went wrong in getMessagesByChannelId: ${e}`);
            return [];
          }
    }

    static async addMessage(userId, channelId, content, createdAt, updatedAt) {
        try {
            const messageDoc = {
                userId: userId,
                channelId: channelId,
                content: content,
                createdAt: createdAt,
                updatedAt: updatedAt
                }
            return await messages.insertOne(messageDoc);
        } catch (e) {
            console.error(`unable to post message: ${e}`);
            return { error: e };
        }
    }

    static async updateMessage(messageId, userId, content, updatedAt) {
        try {
            const updateResponse = await messages.updateOne(
                { userId: userId, _id: ObjectId(messageId) },
                { $set: { content: content, updatedAt: updatedAt} }
                );
                return updateResponse;
        } catch (e) {
            console.error(`unable to patch messages: ${e}`);
        }
    }

    static async deleteMessage(messageId, userId) {
        try {
            return await messages.deleteOne({ 
                _id: ObjectId(messageId),
                userId: userId,
            });
        } catch (e) {
            console.error(`unable to delete user: ${e}`);
        }
    }
}