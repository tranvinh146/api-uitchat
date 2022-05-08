import User from "../models/User.js";

export default class UserController {
	// [GET] /users/me/servers/:serverid
	static async apiGetUsersByServerId(req, res, next) {
		try {
			const response = await User.getUsersByServerId(req.params.serverid)
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json({ error: `Unable to issue find command, ${err}` });
		}
	}

	// [GET] /users/me
	static async apiGetCurrentUser(req, res, next) {
		try {
			const userId = req.userId;
			const response = await User.findById(userId, "_id email name avatar");
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json({ error: `Unable to issue find command, ${err}` });
		}
	}

	// [GET] /users/:userid
	static async apiGetById(req, res, next) {
		try {
			const userId = req.params.userid;
			const response = await User.findById(userId, "_id email name avatar");
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json({ error: `Unable to issue find command, ${err}` });
		}
	}

	// [PATCH] /users/me
	static async apiUpdate(req, res, next) {
		try {
			const userId = req.userId;
			const newValues = req.body;
			await User.updateOne({ _id: userId }, newValues);
			res.status(200).json({ status: "success" });
		} catch (err) {
			res.status(500).json({ error: `Unable to update user, ${err}` });
		}
	}

	// [DELETE] /users/me
	static async apiDelete(req, res, next) {
		try {
			const userId = req.userId;
			await User.findByIdAndDelete(userId);
			res.status(200).json({ status: "success" });
		} catch (err) {
			res.status(500).json({ error: `Unable to update user, ${err}` });
		}
	}

	// [PATCH] users/me/servers/:serverid
	static async apiJoinServer(req, res, next) {
		try {
			const userId = req.userId;
			const serverId = req.params.serverid;

			await User.joinServer(userId, serverId);
			res.status(200).json({ status: "success" });
		} catch (error) {
			res.status(500).json({ error: `Unable to join server, ${error}` });
		}
	}

	// [GET] /users/me/friends
	static async apiGetFriendsList(req, res, next) {
		try {
			const userId = req.userId;
			const response = await User.getFriendsList(userId);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error: `Unable to get friend list, ${error}` });
		}
	}

	// [PATCH] /users/me/friends/:friendid
	static async apiAddFriend(req, res, next) {
		try {
			const userId = req.userId;
			const friendId = req.params.friendid;
			await User.addFriend(userId, friendId);
			res.status(200).json({ status: "success" });
		} catch (error) {
			res.status(500).json({ error: `Unable to add friend, ${error}` });
		}
	}
}
