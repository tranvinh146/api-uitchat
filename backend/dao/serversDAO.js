import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let servers;

export default class ServersDAO {
  static async injectDB(conn) {
    if (servers) {
      return;
    }

    try {
      servers = await conn.db(process.env.UITCHAT_NS).collection("servers");
    } catch (e) {
      console.error(`unable to establish connection in serversDAO: ${e}`);
    }
  }

  static async getServers(userId) {
    let query = { $id: new ObjectId(userId) };

    let cursor;
    try {
      cursor = await servers.find(query);
      const serversList = await cursor.toArray();
      return { serversList };
    } catch (err) {
      console.error(`unable to find command, ${err}`);
      return { serversList: [] };
    }
  }

  static async getServerById(id) {
    try {
      return await servers
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "channels",
              localField: "_id",
              foreignField: "server_id",
              as: "channels",
            },
          },
        ])
        .next();
    } catch (error) {
      console.error(`something went wrong in getServerById: ${e}`);
      throw e;
    }
  }

  static async addServer(userId, name, role, date) {
    try {
      const serverDoc = {
        admin: userId,
        name: name,
        role: role,
        date: date,
      };
      const addResponse = await servers.insertOne(serverDoc);
      return addResponse;
    } catch (error) {
      console.error(`unable to post server: ${error}`);
      return { error: error.message };
    }
  }

  static async updateServer(serverId, userId, role, name, date) {
    try {
      const updateResponse = await servers.updateOne(
        { admin: userId, _id: ObjectId(serverId) },
        { $set: { name: name, role: role, date: date } }
      );
      return updateResponse;
    } catch (error) {
      console.error(`unable to update server: ${error}`);
      return { error: error.message };
    }
  }

  static async deleteSever(serverId, userId) {
    try {
      const deleteResponse = await servers.deleteOne({
        _id: ObjectId(serverId),
        admin: userId,
      });
      return deleteResponse;
    } catch (error) {
      console.error(`unable to delete server: ${error}`);
      return { error: error.message };
    }
  }
}
