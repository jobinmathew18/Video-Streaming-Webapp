import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can only update only in your account!"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('account deleted successfully')
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can delete only your account!"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id) 
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const getCurrentUser = async (req,res,next)=>{
    try {
        const currentUser = await User.findById(req.user.id)
        res.status(200).json(currentUser)
    } catch (error) {
        next(error)
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $addToSet: { subscribedUsers: req.params.id } })  //subscribing to user  //$addToSet will not allow duplicate elements
        await User.findByIdAndUpdate(req.params.id, { $addToSet: { subscribers: req.user.id } })                            //increasing subscriber no. of subsribed user
        res.status(200).json("Subscribed to a channel!")
    } catch (error) {
        next(error)
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { subscribedUsers: req.params.id } })
        await User.findByIdAndUpdate(req.params.id, { $pull: { subscribers: req.user.id } })
        res.status(200).json("Unsubscribed to a channel!")
    } catch (error) {
        next(error)
    }
}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId
    try {
        const video = await Video.findById(videoId)
        await video.updateOne({ $pull: { dislikes: id } })
        if (video.likes.includes(id)) {
            await video.updateOne({ $pull: { likes: id } })
            res.status(200).json("like removed!")
        } else {
            await video.updateOne({ $push: { likes: id } })
            res.status(200).json("liked a video!")
        }
    } catch (error) {
        next(error)
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId
    try {
        const video = await Video.findById(videoId)
        await video.updateOne({ $pull: { likes: id } })
        if (video.dislikes.includes(id)) {
            await video.updateOne({ $pull: { dislikes: id } })
            res.status(200).json("dislike removed!")
        } else {
            await video.updateOne({ $push: { dislikes: id } })
            res.status(200).json("disliked a video!")
        }
    } catch (error) {
        next(error)
    }
}