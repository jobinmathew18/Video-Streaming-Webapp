import mongoose from "mongoose";
import dotev from 'dotenv'
dotev.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log("MongoDB connection successful");
}).catch( (error) =>{
    console.log(error);
}); 