import jwt from "jsonwebtoken"

export const AuthMiddlewear=async (req,res,next)=>{
    const token=req.headers["authorization"]?.split(" ")[1]

    if(!token) {
        return res.status(401).json({message:"No token provided"})
    }

    try{
            const decoded=jwt.verify(token,"Secret123")
            req.user=decoded
            next()
        }catch(err){
            return res.status(403).json({ message: "Invalid or expired token" });
        }
}