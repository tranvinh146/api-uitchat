import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js"

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class ConversationController {

    static async apiGetListConversations(req, res, next) {
        try {
          const conversationsPerPage = req.query.conversationsPerPage
            ? parseInt(req.query.conversationsPerPage)
            : 20;
          const ownerId = req.userId;
          const { conversationsList, totalNumConversations } =
            await Conversation.getConversationByUserId(ownerId, conversationsPerPage);
          if (!conversationsList) {
            res.status(404).json({ error: "not found" });
            return;
          }
          let response = {
            total_results: totalNumConversations,
            results: conversationsList,
          };
          res.json(response);
        } catch (e) {
          console.log(`api, ${e}`);
          res.status(500).json({ error: e });
        }
    }

    static async apiPostConversation(req, res, next) {
        try {
          const ownerId = req.userId;
          const memberId = req.params.memberId;
          const result = await Conversation.addNewConversation(ownerId, memberId);
          if (!result) {
            res.status(404).json({ error: "Conversation not found" });
            return;
          }
          res.json(result);
        } catch (e) {
          console.log(`api, ${e}`);
          res.status(500).json({ error: e });
        }
    }

}
