import TopicReg from "../models/TopicReg.js";
import sanitize from 'mongo-sanitize';

export const addTopic = async (req, res) => {
  const tid = req.body.tid;
  const groupID = req.body.groupID;
  const groupName = req.body.groupName;
  const rField = req.body.rField;
  const rTopic = req.body.rTopic;
  const leaderEmail = req.body.leaderEmail;
  const comment = req.body.comment;

  const newTopic = new TopicReg({
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
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

export const getAllTopic = async (req, res) => {
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

export const getSingleTopic = async (req, res) => {
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

export const getSingleTopicData = async (req, res) => {
  const gid = sanitize(req.params.id);

  await TopicReg.findOne({ groupID: gid }).exec((err, Topic) => {
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

export const updateSingleRecord = async (req, res) => {
  let topicid = sanitize(req.params.id);
  const {
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
    status,
  } = req.body;

  const updateTopic = {
    tid,
    groupID,
    groupName,
    rField,
    rTopic,
    leaderEmail,
    comment,
    status,
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

export const deleteTopic = async (req, res) => {
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

//get group id using leader's email
export const getGroupID = async (req, res) => {
  const leaderEmail = sanitize(req.params.leaderEmail);

  await TopicReg.findOne({ leaderEmail: leaderEmail })

    .then((data) => {
      res.json(data.groupID);
    })
    .catch((err) => {
      console.log(err);
    });
};
