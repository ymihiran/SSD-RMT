import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
  {
    groupID: {
      type: String,
      required: true,
    },
    Doctype: {
      type: String,
      required: true,
    },
    researchTopic: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    evaluatedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DocumentEvaluation = mongoose.model(
  "Document Evaluation",
  DocumentSchema
);
export default DocumentEvaluation;
