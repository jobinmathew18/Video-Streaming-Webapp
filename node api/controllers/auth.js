import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js' 
import jwt from 'jsonwebtoken'

export const signUp = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hashedPassword})
        await newUser.save()
        res.status(200).json("User has been creatad!")
    } catch (err) {
        next(err)
    }
} 

export const signIn = async (req,res,next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404, "User not found!"))
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(400, "Invalid credentials!"))

        const token = jwt.sign({id:user._id}, process.env.JWT)
        const {password, ...others} = user

        res.cookie("access_token", token, {                 //set token in cookies
            httpOnly: true
        }).status(200).json(others._doc)
    } catch (error) {
        next(error)
    } 
} 

export const googleAuth = async (req,res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
        }else{
            const newUser = new User({              //if there is not user then create new user and then set token in the cookies
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({id:savedUser._id}, process.env.JWT, {expiresIn: "3d"});
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)
        }
    } catch (error) {
        next(error)
    }
}

export const signout = (req,res,next)=>{
    try {
        res.clearCookie('access_token')
        res.status(200).json("User Logged out!")
    } catch (error) {
        next(error)
    }
}