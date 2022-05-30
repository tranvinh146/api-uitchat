import mongoose from "mongoose";
import User from "./User.js";

const contactSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

contactSchema.statics.getContactsByUserId = async function (userId) {
  try {
    const contacts = await this.find({ users: userId }).populate({
      path: "users",
      select: ["_id", "email", "name", "avatar"],
    });
    return contacts;
  } catch (error) {
    console.error(`something went wrong in getContactsByUserId: ${error}`);
    throw error;
  }
};

contactSchema.statics.getContactById = async function (contactId) {
  try {
    const contact = await this.findById(contactId).populate({
      path: "users",
      select: ["_id", "email", "name", "avatar"],
    });
    return contact;
  } catch (error) {
    console.error(`something went wrong in getContactsByUserId: ${error}`);
    throw error;
  }
};

contactSchema.statics.createContact = async function (senderId, receiverId) {
  try {
    const existContact = await this.findOne({
      $and: [{ users: senderId }, { users: receiverId }],
    });
    if (existContact) {
      return;
    }
    const newContact = await this.create({ users: [senderId, receiverId] });
    const contact = await this.findById(newContact._id).populate({
      path: "users",
      select: ["_id", "email", "name", "avatar"],
    });
    return contact;
  } catch (error) {
    console.error(`something went wrong in createContact: ${error}`);
    throw error;
  }
};

export default mongoose.model("Contact", contactSchema);
