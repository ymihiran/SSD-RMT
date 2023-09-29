import express from "express";

import {
  SubmitDoc,
  getDocs,
  getSubmitDocs,
  updateDocStatus,
} from "../controllers/SubmitDocController.js";
const router = express.Router();

router.post("/", SubmitDoc);
router.get("/", getDocs);
router.get("/student/:email", getSubmitDocs);

//Update document Status
router.put("/status/:id", updateDocStatus);

export default router;
