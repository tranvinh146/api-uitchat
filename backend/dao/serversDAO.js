import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let servers;

export default class ServerDAO {
  static async injectDB(conn) {
    if (servers) {
      return;
    }

    try {
      movies = await conn.db(process.env.UITCHAT_NS).collection("servers");
    } catch (e) {
      console.error(`unable to connect in ServersDAO: ${e}`);
    }
  }

  static async getServers(userId) {
    let query = { $id: new ObjectId(userId) };

    let cursor;
    try {
      cursor = await servers.find(query);
      const serversList = await cursor.toArray();
      return serversList;
    } catch (err) {
      console.error(`unable to find command, ${err}`);
      return [];
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
}
