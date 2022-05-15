import User from "../models/User.js";
import Invitation from "../models/Invitation.js";

export default function socket(io) {
	io.on('connection', (socket) => {

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
	});
}