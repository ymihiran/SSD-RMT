import express from "express";

import {
  StudentGroup,
  getAllGroup,
  getGroupID,
} from "../controllers/StudentGroupController.js";
const router = express.Router();

router.post("/", StudentGroup);

router.get("/", getAllGroup);

router.get("/:stdEmail", getGroupID);

export default router;
