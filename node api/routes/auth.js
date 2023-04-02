import express from 'express'
import { googleAuth, signIn, signUp, signout } from '../controllers/auth.js';
const router = express.Router()

//CREATE A USER
router.post('/signup', signUp)

//SIGN IN
router.post('/signin', signIn)

//GOOGLE AUTHENTICATION
router.post('/google', googleAuth) 

//SIGN OUT
router.post('/signout', signout)


export default router;