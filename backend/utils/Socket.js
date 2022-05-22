import User from "../models/User.js";
import Invitation from "../models/Invitation.js";
import Channel from "../models/Channel.js";
import Server from "../models/Server.js";

export default function socket(io) {
    io.on('connection', (socket) => {

        console.log(`User ${socket.id} has connected.`);

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} has disconnected.`);
        });

        //user join an room with channelId is the name
        socket.on("join-room", (serverId) => {
            socket.join(serverId);
        })

        //user leave room when clicking other server
        socket.on("leave-room", (serverId) => {
            socket.leave(serverId);
        })

        socket.on("invite", async (invitation) => {
            try {
                const receiver = await User.findById(invitation.receiverId);

                // save invitation to db
                const newInvitation = await Invitation.addInvitation(receiver._id, invitation);

                const populatedInvitation = await Invitation.findById(newInvitation._id).populate({
                    path: 'senderId receiverId serverId',
                    select: "name avatar"
                });

                io.to(receiver.socketId).emit("have new invitation", populatedInvitation);
                socket.emit("invitation has been sent successfully");
            } catch (error) {
                socket.emit("failed to send invitation", error.message);
            }

        });

        socket.on("accept invitation", async (invitationId) => {
            try {
                const invitation = await Invitation.findById(invitationId).populate({
                    path: "senderId receiverId serverId",
                    select: "socketId"
                });
                if (!invitation) {
                    throw Error("Invitation doesn't exist");
                }

                await Invitation.removeInvitation(invitation.receiverId._id, invitationId);
                await User.joinServer(invitation.receiverId._id, invitation.serverId._id);

                socket.emit("invitation responded");
                io.to(invitation.senderId.socketId).emit("invitation responded");

            } catch (error) {
                socket.emit("failed to accept invitation", error.message);
            }
        });

        socket.on("decline invitation", async (invitationId) => {
            try {
                const invitation = await Invitation.findById(invitationId).populate({
                    path: "senderId receiverId",
                    select: "socketId"
                });
                if (!invitation) {
                    throw Error("Invitation doesn't exist");
                }

                await Invitation.removeInvitation(invitation.receiverId._id, invitationId);

                socket.emit("invitation responded");
                io.to(invitation.senderId.socketId).emit("invitation responded");

            } catch (error) {
                socket.emit("failed to decline invitation", error.message);
            }
        });

        socket.on("chat-message", (message, serverId) => {
            //broadcast message to everyone in port:5000 except yourself.
            socket.to(serverId).emit("receive-message", message);
            //save chat to the database
            connect.then(db => {
                console.log("connected correctly to the server");

                let chatMessage = new Chat({ message: msg, sender: "Anonymous" });
                chatMessage.save();
            });
        });
    });
}