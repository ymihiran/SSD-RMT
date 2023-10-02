import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/userCtrl.js';

//Added auth middleware protection to the routes
import auth from '../middleware/auth.js';



router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/infor/:id', auth, userCtrl.getUserInforParam)

router.get('/allprof', auth, userCtrl.allusers)

router.get('/panel/:id', auth, userCtrl.panelMembers)

router.post('/reset/:id', auth, userCtrl.resetPassword)

router.delete('/delete/:id', auth, userCtrl.deleteUser)

router.patch('/update/:id', auth, userCtrl.updateUser)

router.get('/logout', userCtrl.logout)

export default router;