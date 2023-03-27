import express from 'express'
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, subscribed, trending, updateVideo } from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

//CREATE A VIDEO
router.post('/', verifyToken, addVideo)

//UPDATE A VIDEO
router.put('/:id', verifyToken, updateVideo)

//DELETE A VIDEO
router.delete('/:id', verifyToken, deleteVideo)

//GET VIDEO
router.get('/find/:id', getVideo)

//UPDATE/INCREASE VIEWS 
router.put('/view/:id', addView)

//GET TRENDING VIDEOS
router.get('/trending', trending)

//GET RANDOM VIDEOS
router.get('/random', random)

//GET SUBSRCIBED VIDEOS
router.get('/subscribed', verifyToken, subscribed)

//GET VIDEOS BY TAGS
router.get('/tags', getByTag)

//GET VIDEOS BY SEARCH
router.get('/search', search)


export default router