import express from "express"
import dbConnection from "./config.js"
import router from "./Routes/UserRoutes.js"
import { AuthMiddlewear } from "./Middlewears/AuthMiddlewear.js"
import cors from "cors"
import BookmarkRoutes from "./Routes/BookmarkRoutes.js"

const app=express()
app.use(cors())

dbConnection()

app.get("/test",AuthMiddlewear,(req,res)=>{
    res.status(200).send("Welcome")
})

app.use(express.json())//for parsing req body
app.use("/api",router)
app.use("/api/bookmarks", BookmarkRoutes);

const PORT=5000
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at port ${PORT}`);
})
