import mongoose from "mongoose";

const dbConnection=async () =>{
    try{
        await mongoose.connect("mongodb+srv://karushnika_db_user:p2iLY5ToZF9mg3zH@cluster0.xbqz2lh.mongodb.net/")
        console.log("Connected to db successfully")
    }catch(err){
        console.log("Failed to connect",err)
    }
    
}

export default dbConnection