import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/userCtrl.js';




router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/infor/:id',userCtrl.getUserInfor)

router.get('/allprof',userCtrl.allusers)

router.get('/panel/:id',userCtrl.panelMembers)

router.post('/reset/:id', userCtrl.resetPassword)

router.delete('/delete/:id', userCtrl.deleteUser)

router.patch('/update/:id', userCtrl.updateUser)

router.get('/logout', userCtrl.logout)

export default router;