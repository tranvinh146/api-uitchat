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
}