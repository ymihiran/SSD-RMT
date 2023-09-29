import SubmitDocRoute from "../models/SubmitDoc.js";

//Get submitted documents details
export const getDocs = async (req, res) => {
  SubmitDocRoute.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//Get student's documents details

export const getSubmitDocs = async (req, res) => {
  console.log("email", req.params.email);
  const email = req.params.email;
  SubmitDocRoute.find({ email: email })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//Get student's documents details
export const SubmitDoc = async (req, res) => {
  console.log("req.body", req.body);
  const GroupID = req.body.GroupID;
  const ResearchField = req.body.ResearchField;
  const Document = req.body.song;
  const DocType = req.body.DocType;
  const email = req.body.email;
  const Comment = req.body.Comment;
  const ResearchTopic = req.body.ResearchTopic;

  const newType = new SubmitDocRoute({
    GroupID,
    ResearchField,
    Document,
    DocType,
    Comment,
    email,
    ResearchTopic,
  });

  newType
    .save()
    .then(() => {
      res.json("Document Submit Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

//update document status
export const updateDocStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.Status;

  console.log("id", id);
  await SubmitDocRoute.findByIdAndUpdate(id, {
    Status: status,
  }).then(() => {
    res.json("Document Status Updated");
  });
};
