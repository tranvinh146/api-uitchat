import User from "../models/User.js";
import Message from "../models/Message.js";
import Server from "../models/Server.js";
import Invite from "../models/Invite.js";
import Channel from "../models/Channel.js";

export default function socket(io) {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    // console.log(`${userId} connected`);
    socket.join(userId);

    // Join channel
    socket.on("join-server", ({ serverId }) => {
      if (serverId) {
        socket.join(serverId);
        // console.log(`user ${userId} joined server ${serverId}`);
      }
    });

    // Join channel
    socket.on("join-channel", ({ channelId }) => {
      if (channelId) {
        socket.join(channelId);
        // console.log(`user ${userId} joined ${channelId}`);
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

    socket.on("delete-server" , async({serverId}) => {
      console.log(serverId)
      await Server.deleteServer(serverId, userId)
      io.to(serverId).emit("deleted-server", serverId)
    })

    socket.on("leave-server" , async({serverId}) => {
      await Server.leaveServer(serverId, userId)
      //io.to(serverId).emit("left-server", serverId)
    })

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
      const channels = await Channel.find({ serverId, isPublic: true });
      channels.map((channel) =>
        io.to(channel._id.toString()).emit("user-join-channel", user)
      );
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

    // LOGIN/LOGOUT
    // login
    // console.log(`User ${socket.id} has connected.`);

    // socket.on("login", async (userId) => {
    //   try {
    //     const user = await User.findById(userId);
    //     user.socketId = socket.id;
    //     user.status = "online";
    //     await user.save();
    //   } catch (error) {
    //     // console.log(error.message);
    //   }
    // });

    // socket.on("disconnect", async () => {
    //   console.log(`User ${socket.id} has disconnected.`);
    //   try {
    //     const user = await User.findOne({ socketId: socket.id });
    //     user.socketId = null;
    //     user.status = "offline";
    //     await user.save();
    //   } catch (error) {
    //     // console.log(error.message);
    //   }
    // });

    // socket.on("login", async (userId) => {
    //   try {
    //     const user = await User.findById(userId);
    //     user.socketId = socket.id;
    //     user.status = "online";
    //     await user.save();
    //   } catch (error) {
    //     // console.log(error.message);
    //   }
    // });

    // socket.on("disconnect", async () => {
    //   console.log(`User ${socket.id} has disconnected.`);
    //   try {
    //     const user = await User.findOne({ socketId: socket.id });
    //     user.socketId = null;
    //     user.status = "offline";
    //     await user.save();
    //   } catch (error) {
    //     // console.log(error.message);
    //   }
    // });

    // //user join an room with serverlId is the name
    // socket.on("join-room", (serverId) => {
    //   socket.join(serverId);
    // });

    // //user leave room when clicking other server
    // socket.on("leave-room", (serverId) => {
    //   socket.leave(serverId);
    // });

    // // INVITATION
    // socket.on("invite", async (invitation) => {
    //   try {
    //     const receiver = await User.findById(invitation.receiverId);

    //     // save invitation to db
    //     const newInvitation = await Invitation.addInvitation(
    //       receiver._id,
    //       invitation
    //     );

    //     const populatedInvitation = await Invitation.findById(
    //       newInvitation._id
    //     ).populate({
    //       path: "senderId receiverId serverId",
    //       select: "name avatar",
    //     });

    //     io.to(receiver.socketId).emit(
    //       "have new invitation",
    //       populatedInvitation
    //     );
    //     socket.emit("successfully sent invitation");
    //   } catch (error) {
    //     socket.emit("failed to send invitation", error.message);
    //   }
    // });

    // socket.on("accept invitation", async (invitationId) => {
    //   try {
    //     const invitation = await Invitation.findById(invitationId).populate({
    //       path: "senderId receiverId serverId",
    //       select: "socketId",
    //     });
    //     if (!invitation) {
    //       throw Error("Invitation doesn't exist");
    //     }

    //     await Invitation.removeInvitation(
    //       invitation.receiverId._id,
    //       invitationId
    //     );
    //     await User.joinServer(
    //       invitation.receiverId._id,
    //       invitation.serverId._id
    //     );

    //     socket.emit("successfully accepted invitation");
    //     io.to(invitation.senderId.socketId).emit("invitation responded");
    //     // emit to server -> re-render member list
    //   } catch (error) {
    //     socket.emit("failed to accept invitation", error.message);
    //   }
    // });

    // socket.on("decline invitation", async (invitationId) => {
    //   try {
    //     const invitation = await Invitation.findById(invitationId).populate({
    //       path: "senderId receiverId",
    //       select: "socketId",
    //     });
    //     if (!invitation) {
    //       throw Error("Invitation doesn't exist");
    //     }

    //     await Invitation.removeInvitation(
    //       invitation.receiverId._id,
    //       invitationId
    //     );

    //     socket.emit("successfully declined invitation");
    //     io.to(invitation.senderId.socketId).emit("invitation responded");
    //   } catch (error) {
    //     socket.emit("failed to decline invitation", error.message);
    //   }
    // });
  });
}
