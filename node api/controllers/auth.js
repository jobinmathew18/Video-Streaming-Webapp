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

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others._doc)
    } catch (error) {
        next(error)
    } 
}