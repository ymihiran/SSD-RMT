import UplaodTemplateRoute from "../models/UploadTemplate.js";
import sanitize from 'mongo-sanitize';

export const UploadTemplate = async (req, res) => {
  console.log(req.body);
  const AdminName = sanitize(req.body.AdminName);
  const Title = sanitize(req.body.Title);
  const SchemaType = sanitize(req.body.SchemaType);
  const Template = sanitize(req.body.song);
  const Description = sanitize(req.body.Description);

  const newType = new UplaodTemplateRoute({
    AdminName,
    Title,
    Template,
    SchemaType,
    Description,
  });

  newType
    .save()
    .then(() => {
      res.json("Upload Template Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

//GET ALL TEMPLATE
export const getAllTypes = async (req, res) => {
  await UplaodTemplateRoute.find()
    .then((createtypes) => {
      res.json(createtypes);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//DELETE A CREATE TYPE
export const deleteTemplate = async (req, res) => {
  let tempid = sanitize(req.params.id);
  console.log(tempid);
  await UplaodTemplateRoute.findByIdAndDelete(tempid)
    .then(() => {
      res.status(200).send({ status: "Deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error delete" });
    });
};
