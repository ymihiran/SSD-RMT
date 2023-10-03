import SubmitDocRoute from "../models/SubmitDoc.js";
import sanitize from 'mongo-sanitize';

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
  const email = sanitize(req.params.email);
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
  const GroupID = sanitize(req.body.GroupID);
  const ResearchField = sanitize(req.body.ResearchField);
  const Document = sanitize(req.body.song);
  const DocType = sanitize(req.body.DocType);
  const email = sanitize(req.body.email);
  const Comment = sanitize(req.body.Comment);
  const ResearchTopic = sanitize(req.body.ResearchTopic);

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
  const id = sanitize(req.params.id);
  const status = sanitize(req.body.Status);

  console.log("id", id);
  await SubmitDocRoute.findByIdAndUpdate(id, {
    Status: status,
  }).then(() => {
    res.json("Document Status Updated");
  });
};
