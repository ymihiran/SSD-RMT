import express from "express";
import { ReqCoSupervisor } from "../controllers/ReqCoSupervisorController.js";
const router = express.Router();

router.get("/co/:field/:role", ReqCoSupervisor);

export default router;
