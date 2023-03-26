import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token                  //fetching token from cookies
    if(!token) return next(createError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT, (err,user)=>{
        if(err) return next(createError(403, "Token is not valid!"))
        console.log(user)
        req.user = user;
        next()                      //if everything is ok then continue to fetch from database
    })
}