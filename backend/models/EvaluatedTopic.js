import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EvaluatedTopicSchema = new Schema({
  tid: {
    type: String,

  },

  groupID: {
    type: String,

  },

  groupName: {
    type: String,

  },

  rField: {
    type: String,

  },

  rTopic: {
    type: String,

  },

  leaderEmail: {
    type: String,

  },

  comment: {
    type: String,

  },

  Evaluation: {
    type: String,
  },
});

const ETopic = mongoose.model("evaluatedTopic", EvaluatedTopicSchema);
export default ETopic;

