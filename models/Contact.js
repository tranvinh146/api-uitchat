import mongoose from "mongoose";
import User from "./User.js";

const contactSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    channelId: {
      type: mongoose.Types.ObjectId,
      required: true,
      auto: true,
    },
    contact: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

contactSchema.statics.getContactsByUserId = async function (userId) {
  try {
    const contacts = await this.find({ userId }).populate({
      path: "contact",
      select: ["_id", "email", "name", "avatar"],
    });
    return contacts;
  } catch (error) {
    console.error(`something went wrong in getContactsByUserId: ${error}`);
    throw error;
  }
};

contactSchema.static.createContact = async function (userId, contactId) {
  try {
    const newContact = await this.create({ userId, contact: contactId });
    const contact = await this.findById(newContact._id);
    return contact;
  } catch (error) {
    console.error(`something went wrong in createContact: ${error}`);
    throw error;
  }
};

export default mongoose.model("Contact", contactSchema);
