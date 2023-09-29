import coSuperVisor from "../models/userModel.js";

export const ReqCoSupervisor = async (req, res) => {
  const field = req.params.field;
  const role = req.params.role;

  coSuperVisor
    .find({ research_area: field, user_role: role })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
