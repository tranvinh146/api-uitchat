import Message from "../../models/message.js";

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class MessagesController {
  static async apiGetMessagesByChannelId(req, res, next) {
    try {
      let channelId = req.params.channelid || {};
      const { messagesList, totalNumMessages } = await Message.findByChannelId(
        channelId
      );
      if (!messagesList) {
        res.status(404).json({ error: "not found" });
        return;
      }
      let response = {
        count: totalNumMessages,
        results: messagesList,
      };
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
      const result = await Message.addMessage(userId, channelId, content);
      res.json(result);
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
      const result = await Message.updateMessage(
        ObjectId(messageId),
        userId,
        content
      );
      res.json(result);
    } catch (e) {
      console.log(`Error when edit message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteMessage(req, res, next) {
    try {
      const messageId = req.body.messageId;
      const userId = req.body.userId;
      const result = await Message.deleteMessage(ObjectId(messageId), userId);

      res.json(result);
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
      const { messagesList, totalNumMessages } = await Message.searchMessage(
        channelId,
        userId,
        searchText
      );
      if (!messagesList) {
        res.status(404).json({ error: "not found" });
        return;
      }
      let response = {
        total_results: totalNumMessages,
        messagesList: messagesList,
      };
      res.json(response);
    } catch (e) {
      console.log(`Error when Search message`);
      res.status(500).json({ error: e });
    }
  }
}
