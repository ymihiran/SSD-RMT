import StudentGroupRoute from "../models/StudentGroups.js";
import sanitize from 'mongo-sanitize';

export const StudentGroup = async (req, res) => {
  const Group_Leader_Name = sanitize(req.body.Group_Leader_Name);
  const Student_ID = sanitize(req.body.Student_ID);
  const Group_Leader_Email = sanitize(req.body.Group_Leader_Email);
  const Member2_Name = sanitize(req.body.Member2_Name);
  const Member2_ID = sanitize(req.body.Member2_ID);
  const Member2_Email = sanitize(req.body.Member2_Email);
  const Member3_Name = sanitize(req.body.Member3_Name);
  const Member3_ID = sanitize(req.body.Member3_ID);
  const Member3_Email = sanitize(req.body.Member3_Email);
  const Member4_Name = sanitize(req.body.Member4_Name);
  const Member4_ID = sanitize(req.body.Member4_ID);
  const Member4_Email = sanitize(req.body.Member4_Email);
  const Feedback = sanitize(req.body.Feedback);

  const newGroup = new StudentGroupRoute({
    Group_Leader_Name,
    Student_ID,
    Group_Leader_Email,
    Member2_Name,
    Member2_ID,
    Member2_Email,
    Member3_Name,
    Member3_ID,
    Member3_Email,
    Member4_Name,
    Member4_ID,
    Member4_Email,
    Feedback,
  });

  await newGroup
    .save()
    .then(() => {
      res.json("Create Group Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all groups
export const getAllGroup = async (req, res) => {
  await StudentGroupRoute.find()
    .then((groupregisters) => {
      res.json(groupregisters);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//get group's mongoose _id by student email
export const getGroupID = async (req, res) => {
  const stdEmail = sanitize(req.params.stdEmail);
  await StudentGroupRoute.findOne({
    $or: [
      { Group_Leader_Email: stdEmail },
      { Member2_Email: stdEmail },
      { Member3_Email: stdEmail },
      { Member4_Email: stdEmail },
    ],
  })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
