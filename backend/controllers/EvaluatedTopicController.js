import TopicReg from "../models/EvaluatedTopic.js";
import sanitize from 'mongo-sanitize';

export const addEvaluatedTopic = async (req, res) => {
  const tid = req.body.tid;
  const groupID = req.body.groupID;
  const groupName = req.body.groupName;
  const rField = req.body.rField;
  const rTopic = req.body.rTopic;
  const leaderEmail = req.body.leaderEmail;
  const comment = req.body.comment;
  const Evaluation = req.body.Evaluation;

  const newTopic = new TopicReg({
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
    Evaluation,
  });

  await newTopic
    .save()
    .then(() => {
      res.json("Topic Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllEvaluatedTopic = async (req, res) => {
  await TopicReg.find().exec((err, Topic) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to get all Topics",
      });
    }
    return res.status(200).json({
      success: true,
      topicRouter: Topic,
    });
  });
};

export const getSingleEvaluatedTopic = async (req, res) => {
  let topicid = sanitize(req.params.id);

  await TopicReg.find({ _id: topicid }).exec((err, Topic) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to get a Topic",
      });
    }
    return res.status(200).json({
      success: true,
      topicRouter: Topic,
    });
  });
};

export const updateSingleEvaluatedRecord = async (req, res) => {
  let topicid = sanitize(req.params.id);
  const {
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
    Evaluation,
  } = req.body;

  const updateTopic = {
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
    Evaluation,
  };

  const update = await TopicReg.findByIdAndUpdate(topicid, updateTopic)
    .then(() => {
      res.status(200).send({ status: "Updated" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error update" });
    });
};

export const deleteEvaluatedTopic = async (req, res) => {
  let topicid = sanitize(req.params.id);
  await TopicReg.findByIdAndDelete(topicid)
    .then(() => {
      res.status(200).send({ status: "Deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error delete" });
    });
};
