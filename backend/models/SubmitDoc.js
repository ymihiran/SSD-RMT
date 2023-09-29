import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubmitDocSchema = new Schema(
  {
    GroupID: {
      type: String,
      required: true,
    },

    Document: {
      type: String,
      required: true,
    },
    DocType: {
      type: String,
    },

    Status: {
      type: String,
      default: "Pending",
    },

    ResearchField: {
      type: String,
      required: true,
    },
    ResearchTopic: {
      type: String,
      required: true,
    },

    Comment: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SubmitDoc = mongoose.model("SubmitDoc", SubmitDocSchema);

export default SubmitDoc;
