import { ObjectId } from "mongodb";

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db(process.env.UITCHAT_NS).collection('users');
        } catch (e) {
            console.error(`unable to connect in UsersDAO: ${e}`);
        }
    }

    static async getUsers() {
        let cursor;
        try {
            cursor = await users.find();
            const usersList = await cursor.toArray();
            const totalNumUsers = await users.countDocuments();
            return {usersList, totalNumUsers};
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return {usersList: [], totalNumUsers: 0};
        }
    }

    static async addUser(user) {
        try {
            return await users.insertOne(user);
        } catch (e) {
            console.error(`unable to post user: ${e}`);
            return { error: e };
        }
    }

    static async updateUser({ userId, ...newValues } = {}) {
        try {
            const query = { _id: ObjectId(userId) };
            return await users.updateOne(query, { $set: newValues });
        } catch (e) {
            console.error(`unable to patch user: ${e}`);
        }
    }

    static async deleteUser(userId) {
        try {
            return await users.deleteOne({ _id: ObjectId(userId) });
        } catch (e) {
            console.error(`unable to delete user: ${e}`);
        }
    }
}