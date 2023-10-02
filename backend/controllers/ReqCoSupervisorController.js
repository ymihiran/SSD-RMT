import coSuperVisor from "../models/userModel.js";
import sanitize from 'mongo-sanitize';

export const ReqCoSupervisor = async (req, res) => {
  const field = sanitize(req.params.field);
  const role = sanitize(req.params.role);

  coSuperVisor
    .find({ research_area: field, user_role: role })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
