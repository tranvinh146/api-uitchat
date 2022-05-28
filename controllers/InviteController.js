import Invite from "../models/Invite.js";
import User from "../models/User.js";

export default class ServersController {
  // [GET] /invites
  static async apiGetInvitesByUserId(req, res, next) {
    try {
      const userId = req.userId;
      const inviteList = await Invite.getInvitesByUserId(userId);
      console.log({ inviteList });
      res.status(200).json({ inviteList });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
