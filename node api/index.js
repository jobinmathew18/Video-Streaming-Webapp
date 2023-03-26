import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import './dbConn.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

app.use(cookieParser())
app.use(express.json())
app.use('/api/users/', userRoutes)
app.use('/api/auth/', authRoutes)

app.use((err,req,res,next)=>{
    // console.log(err)
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(5000, ()=>{
    console.log(`server running on port ${process.env.PORT}`) 
})  