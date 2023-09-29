
import express from "express";
const router = express.Router();

import {
  addEvaluatedTopic,
  getAllEvaluatedTopic,
  getSingleEvaluatedTopic,
  updateSingleEvaluatedRecord,
  deleteEvaluatedTopic,
} from "../controllers/EvaluatedTopicController.js";

router.post("/", addEvaluatedTopic);

//get all topics
router.get("/", getAllEvaluatedTopic);

//get single topic
router.get("/:id", getSingleEvaluatedTopic);

//update single record
router.put("/:id", updateSingleEvaluatedRecord);

router.delete("/:id", deleteEvaluatedTopic);

export default router;

