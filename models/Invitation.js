import mongoose from "mongoose";
import User from "./User.js";

const invitationSchema = new mongoose.Schema(
    {
        senderId: { type: mongoose.Types.ObjectId, ref: "User" },
        receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
        serverId: { type: mongoose.Types.ObjectId, ref: "Server" },
    },
    { timestamps: true }
);

invitationSchema.statics.addInvitation = async function (userId, invitation) {
    try {
        // check if invitation has existed
        const exists = await Invitation.findOne({
            senderId: invitation.senderId,
            receiverId: invitation.receiverId,
            serverId: invitation.serverId,
        });

        if (exists) {
            throw Error("The invitation has existed.");
        }

        // add invitation to db
        const newInvitation = await Invitation.create(invitation);

        // add id to user's invitationIds
        const user = await User.findById(userId);
        user.invitationIds.push(newInvitation._id);
        await user.save();

        return newInvitation;
    } catch (error) {
        console.error(`Unable to add invitation, ${error.message}`);
		throw error;
    }
}

invitationSchema.statics.removeInvitation = async function (receiverId, invitationId) {
    try {
        // remove from db
        await Invitation.findByIdAndDelete(invitationId);

        // remove from user's invitationIds
        const receiver = await User.findById(receiverId);
        const index = receiver.invitationIds.indexOf(mongoose.Types.ObjectId(invitationId));
        if (index !== -1) {
            receiver.invitationIds.splice(index, 1);
            await receiver.save();
        }
    } catch (error) {
        console.error(`Unable to remove invitation, ${error.message}`);
		throw error;
    }
}

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;