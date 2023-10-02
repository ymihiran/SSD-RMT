import Marking from "../models/MarkingScheme.js";
import sanitize from 'mongo-sanitize';

export const getMarkingScheme = async (req, res) => {
  const field = sanitize(req.params.field);
  const type = sanitize(req.params.schemeType);

  Marking.findOne({ specialization: field, schemeType: type })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMarking = async (req, res) => {
  const sid = sanitize(req.body.sid);
  const specialization = sanitize(req.body.specialization);
  const schemeType = sanitize(req.body.schemeType);
  const marks = sanitize(req.body.marks);
  const criteria = sanitize(req.body.criteria);

  const newTopic = new Marking({
    sid,
    specialization,
    schemeType,
    marks,
    criteria,
  });

  newTopic
    .save()
    .then(() => {
      res.json("Marking Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllMarkings = async (req, res) => {
  Marking.find().exec((err, Marking) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to get all Markings",
      });
    }
    return res.status(200).json({
      success: true,
      markingRouter: Marking,
    });
  });
};

export const getSingleMarking = async (req, res) => {
  let mid = sanitize(req.params.id);

  Marking.find({ _id: mid }).exec((err, Marking) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to get a Marking",
      });
    }
    return res.status(200).json({
      success: true,
      markingcRouter: Marking,
    });
  });
};

export const updateMarking = async (req, res) => {
  let mid = sanitize(req.params.id);
  const { sid, specialization, schemeType, marks, criteria } = req.body;

  const updateMarking = {
    sid,
    specialization,
    schemeType,
    marks,
    criteria,
  };

  const update = await Marking.findByIdAndUpdate(mid, updateMarking)
    .then(() => {
      res.status(200).send({ status: "Updated" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error update" });
    });
};

export const deleteMarking = async (req, res) => {
  let mid = sanitize(req.params.id);
  await Marking.findByIdAndDelete(mid)
    .then(() => {
      res.status(200).send({ status: "Deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error delete" });
    });
};
