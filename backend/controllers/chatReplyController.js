import ChatReply from "../models/chatReply.js";

//insert reply message details to the db
export const sendReplyMsg = async (req, res) => {
  console.log("req.body", req.body);
  const { userSup, messageID, message } = req.body;
  const newReplyMsg = new ChatReply({
    userSup,
    messageID,
    message,
  });
  await newReplyMsg
    .save()
    .then(() => {
      res.json(newReplyMsg);
    })
    .catch((err) => {
      console.log("err");
      res.status(500).json(err);
    });
};

//Get reply message details
export const getReplyMsg = async (req, res) => {
  console.log("25");
  const messageID = req.params.messageID;
  ChatReply.find({ messageID: messageID })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

export const getAllReplyMsg = async (req, res) => {
  ChatReply.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//delete a reply
export const deleteReply = async (req, res) => {
  console.log("id delete", req.params.id);
  const msgID = req.params.id;
  ChatReply.findByIdAndDelete(msgID)
    .then((data) => {
      res.status(200).send({ status: "Message  deleted" });
    })
    .catch((err) => {
      console.catch.log(err);
    });
};
