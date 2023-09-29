import express from "express";
import { findGroup, sendReq } from "../controllers/ReqController.js";
const router = express.Router();

router.post("/", sendReq);
router.get("/:groupID", findGroup);

export default router;
