import express from 'express';

import {PanelMember} from '../controllers/PanelMemberCtrl.js';
const router = express.Router();
router.post('/add', PanelMember)

export default router;