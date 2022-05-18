import Message from "../models/Message.js";

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class MessagesController {
  static async apiGetMessagesByChannelId(req, res, next) {
    try {
      const messagesPerPage = req.query.messagesPerPage
        ? parseInt(req.query.messagesPerPage)
        : 20;
      let channelId = req.params.channelId || {};
      const { messagesList, totalNumMessages } =
        await Message.getMessagesByChannelId(channelId, messagesPerPage);
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
      const userId = req.userId;
      const channelId = req.body.channelId;
      const content = req.body.content;
      const result = await Message.addMessage(userId, channelId, content);
      res.status(201).json(result);
    } catch (e) {
      console.log(`Error when Create message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPutMessage(req, res, next) {
    try {
      const messageId = req.body.messageId;
      const userId = req.userId;
      const content = req.body.content;
      let result;
      const isOwnerMessage = await Message.isOwnerMessage(messageId, userId);
      if (isOwnerMessage) {
        result = await Message.updateMessage(messageId, userId, content);
        res.status(201).json(result);
      } else {
        result = {
          code: 400001,
          description: "You are not the owner of this message",
        };
        res.status(400).json(result);
      }
    } catch (e) {
      console.log(`Error when edit message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteMessage(req, res, next) {
    try {
      const messageId = req.body.messageId;
      const userId = req.userId;
      let result;
      const isOwnerMessage = await Message.isOwnerMessage(messageId, userId);
      if (isOwnerMessage) {
        result = await Message.deleteMessage(messageId, userId);
        res.json(result);
      } else {
        result = {
          code: 400001,
          description: "You are not the owner of this message",
        };
        res.status(400).json(result);
      }
    } catch (e) {
      console.log(`Error when Delete message`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiSearchMessages(req, res, next) {
    try {
      let channelId = req.params.channelId || {};
      let searchText = req.query.searchText || "";
      let userId = req.query.userId || "";
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
