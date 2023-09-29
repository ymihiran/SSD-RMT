import mongoose from "mongoose";
const Schema = mongoose.Schema;

const coSuperVisorReq = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    groupID: {
      type: String,
      required: true,
    },
    researchField: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    requested: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CoSuperVisorReq = mongoose.model(
  "Co Supervisor Request",
  coSuperVisorReq
);
export default CoSuperVisorReq;
