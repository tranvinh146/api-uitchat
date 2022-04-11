import MessagesDAO from "../../dao/messagesDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class MessagesController {
  static async apiGetMessages(req, res, next) {
    try {
      let channelId = req.params.channelid || {};
      const messagesList = await MessagesDAO.getMessagesByChannelId(channelId);
      if (!messagesList) {
        res.status(404).json({ error: "not found" });
        return;
      }
      let response = messagesList;
      res.json(response);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostMessage(req, res, next) {
    try {
      const userId = req.body.userId;
      const channelId = req.body.channelId;
      const content = req.body.content;
      const createdAt = new Date();
      const updatedAt = new Date();
      const result = await MessagesDAO.addMessage(
        userId,
        channelId,
        content,
        createdAt,
        updatedAt
      );
      res.json({ status: "Created success message" });
    } catch (e) {
      console.log(`Error when Create message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPutMessage(req, res, next) {
    try {
      const messageId = req.body.messageId;
      const userId = req.body.userId;
      const content = req.body.content;
      const updatedAt = new Date();
      const MessageResponse = await MessagesDAO.updateMessage(
        messageId,
        userId,
        content,
        updatedAt
      );
      // var { error } = MessageResponse;
      // if (error) {
      //     res.status.json({ error });
      // }
      // if (MessageResponse.modifiedCount === 0) {

      //     throw new Error("unable to update message. User may not be original poster");

      // }
      res.json({ status: "Edited success message" });
    } catch (e) {
      console.log(`Error when edite message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteMessage(req, res, next) {
    try {
      const messageId = req.body.messageId;
      const userId = req.body.userId;
      const result = await MessagesDAO.deleteMessage(messageId, userId);
      res.json({ status: "Deleted success message" });
    } catch (e) {
      console.log(`Error when Delete message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiSearchMessages(req, res, next) {
    try {
      let channelId = req.params.channelid || {};
      let searchText = req.query.searchtext || "";
      let userId = req.query.userid || "";
      const {totalNumMessages, messagesList} = await MessagesDAO.searchMessages(channelId, userId, searchText);
      if (!messagesList) {
        res.status(404).json({ error: "not found" });
        return;
      }
      let response = {
        total_results: totalNumMessages, 
        messagesList: messagesList
      };
      res.json(response);
    } catch (e) {
      console.log(`Error when Search message`);
      res.status(500).json({ error: e });
    }
  }
}
