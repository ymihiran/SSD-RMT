import mongoose from "mongoose";
const Schema = mongoose.Schema;

const panelSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      trim: true,
    },
    GroupId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Panel = mongoose.model("Panel", panelSchema);
export default Panel;