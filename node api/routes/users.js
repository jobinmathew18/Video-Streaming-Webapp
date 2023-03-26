import express from 'express'
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router()

//UPDATE A USER
router.put('/:id', verifyToken, update)

//DELETE A USER
router.delete('/:id', deleteUser)

//GET A USER
router.get('/find/:id', getUser)

//SUBSCRIBE A USER
router.put("/sub/:id", subscribe)

//UNSUBSCRIBE A USER
router.put("/unsub/:id", unsubscribe)

//LIKE A VIDEO
router.put("/like/:videoid", like)

//DISLIKE A VIDEO
router.put("/dislike/:videoid", dislike)


export default router; 