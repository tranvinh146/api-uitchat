import User from "../models/User.js";
import Message from "../models/Message.js";
import Server from "../models/Server.js";
import Invite from "../models/Invite.js";
import Channel from "../models/Channel.js";
import Contact from "../models/Contact.js";

async function getData(voiceChannels, io) {
	// 2 return
	return Promise.all(voiceChannels.map(async (channel) => {
		const sockets = await io.in(channel._id.toString()).fetchSockets();
		const userIds = Array.from(sockets).map((socket) => {
			return socket.handshake.query.userId;
		});
		const userList = await User.find({ _id: { $in: userIds } });
		const userInfo = userList.map(user => {
			return {
				avatar: user.avatar,
				name: user.name
			}
		});
		return {
			channelId: channel._id,
			users: userInfo
		};
	}));
}

export default function socket(io) {
	io.on("connection", (socket) => {
		const userId = socket.handshake.query.userId;
		socket.join(userId);

		socket.on("logout", () => {
			socket.leave(userId);
		});

		// Join server
		socket.on("join-server", async ({ serverId }) => {
			if (serverId) {
				socket.join(serverId);
				const channels = await Channel.getChannelsByServerId(serverId);
				const voiceChannels = channels.filter(channel => channel.type === "voice");
				const data = await getData(voiceChannels, io)
				socket.emit("current-users-in-voice-channel", data);
				// data: {
				// 	channeId,
				// 	users: [
				// 		{
				// 			avatar,
				// 			name
				// 		}
				// 	]
				// }
			}
		});

		// Join channel
		socket.on("join-channel", async ({ channelId }) => {
			if (channelId) {
				socket.join(channelId);
				const channel = await Channel.findById(channelId);
				if (channel.type === "voice") {
					const user = await User.findById(socket.handshake.query.userId);
					// broadcast to server
					io.to(channel.serverId).emit("new-user-join-voice-channel", {
						userId: user._id,
						avatar: user.avatar,
						name: user.name,
						channelId: channelId,
					});
				}
			}
		});

		// Leave channel
		socket.on("leave-channel", async ({ channelId }) => {
			if (channelId) {
				socket.leave(channelId);
				const channel = await Channel.findById(channelId);
				io.to(channel.serverId.toString()).emit("user-disconnected", { userId: socket.handshake.query.userId, channelId: channelId })
			}
		});

		// ================== SERVER =======================
		socket.on("update-server", async ({ serverId, name, avatar }) => {
			const server = await Server.updateServer(serverId, userId, {
				name,
				avatar,
			});
			io.to(serverId).emit("updated-server", server);
		});

		socket.on("delete-server", async ({ serverId }) => {
			await Server.deleteServer(serverId, userId);
			io.to(serverId).emit("deleted-server", serverId);
		});

		socket.on("leave-server", async ({ serverId }) => {
			await Server.leaveServer(serverId, userId);
			io.to(serverId).emit("left-server", { userId, serverId });
			if (serverId) {
				socket.leave(serverId);
				const channels = await Channel.find({ serverId });
				channels.map((channel) => socket.leave(channel._id));
			}
		});

		socket.on("delete-member", async ({ serverId, memberIds }) => {
			await Server.removeMembers(serverId, userId, memberIds);
			io.to(serverId).emit("deleted-members", { serverId, memberIds, userId });
		});
		// ================== CHANNEL ======================
		socket.on("delete-channel", async ({ channelId }) => {
			const channel = await Channel.deleteChannel(userId, channelId);
			io.to(channel.serverId.toString()).emit("deleted-channel", {
				channelId,
				serverId: channel.serverId,
			});
		});

		socket.on("add-channel", async ({ serverId, name, type }) => {
			const channel = await Channel.addChannel(
				userId,
				serverId,
				name,
				type,
				true
			);
			io.to(serverId).emit("added-channel", channel);
		});

		socket.on(
			"changeName-channel",
			async ({ channelId, channelName, serverId }) => {
				await Channel.updateChannel(userId, channelId, channelName);
				io.to(serverId).emit("changedName-channel", { channelId, channelName });
			}
		);
		// =================================================

		// =================================================
		// =================================================

		// ================== CONTACT ======================

		socket.on("create-contact", async ({ receiverId }) => {
			const contact = await Contact.createContact(userId, receiverId);
			if (contact) {
				io.to(userId).to(receiverId).emit("created-contact", contact);
			}
		});

		// =================================================
		// =================================================

		// ================== INVITE =======================
		socket.on("invite-users", async ({ serverId, receiverIds }) => {
			return Promise.all(
				receiverIds.map((receiverId) => {
					return new Promise((resolve, reject) => {
						Invite.sendInvite(userId, receiverId, serverId)
							.then((invite) => {
								resolve(invite);
							})
							.catch((error) => {
								// console.log(error.message);
							});
					});
				})
			).then((invites) => {
				invites.forEach((invite) => {
					if (invite !== undefined) {
						io.to(invite.receiverId._id.toString()).emit("send-invite", invite);
					}
				});
			});
		});

		socket.on("accept-invite", async ({ inviteId, serverId }) => {
			await Invite.acceptInvite(inviteId, serverId, userId);
			socket.join(serverId);
			const server = await Server.findById(serverId);
			socket.emit("remove-invite", inviteId);
			socket.emit("accepted-invite", server);
			const user = await User.findById(userId, "_id email name avatar");
			io.to(serverId).emit("user-join-server", user);
		});

		socket.on("reject-invite", async ({ inviteId }) => {
			await Invite.rejectInvite(inviteId);
			socket.emit("remove-invite", inviteId);
		});
		// =================================================

		// ================= MESSAGE =======================

		// add message
		socket.on("send-message", async ({ channelId, content }) => {
			const message = await Message.addMessageForChannel(
				userId,
				channelId,
				content
			);
			io.to(channelId).emit("receive-message", message);
		});

		// update message
		socket.on("update-message", async ({ channelId, messageId, content }) => {
			const message = await Message.updateMessage(messageId, userId, content);
			io.to(channelId).emit("updated-message", message);
		});

		// delete message
		socket.on("delete-message", async ({ channelId, messageId }) => {
			await Message.deleteMessage(messageId, userId);
			io.to(channelId).emit("deleted-message", messageId);
		});

		// =================================================
	});
}
