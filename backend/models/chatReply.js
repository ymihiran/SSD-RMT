import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatReplySchema = new Schema(
  {
    userSup: {
      type: String,
      required: true,
    },
    messageID: {
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

const ChatReplySchema = mongoose.model("Chat Reply", chatReplySchema);
export default ChatReplySchema;
