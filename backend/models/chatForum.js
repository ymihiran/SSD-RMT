import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    group_id: {
      type: String,
      required: true,
    },
    groupID: {
      type: String,
      required: true,
    },
    stdName: {
      type: String,
      required: true,
    },
    stdEmail: {
      type: String,
      trim: true,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatSchema = mongoose.model("Chat", chatSchema);
export default ChatSchema;
