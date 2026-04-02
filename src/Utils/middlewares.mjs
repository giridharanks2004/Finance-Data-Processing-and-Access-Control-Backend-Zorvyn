import dotenv from "dotenv"

dotenv.config()

import jwt from "jsonwebtoken"

export const CheckToken = async (req , res , next) => {
        const token = req.cookies.authtoken

        if(!token){
            return res.status(400).json({
                msg : "token not found please login"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        req.user = decoded

        next()
}


export const RoleCheck = (...allowedRoles) => {
    return (req,res,next) => {
        
        if(!allowedRoles.includes(req.user.role)){
            return res.status(401).json({msg : `only ${allowedRoles} can access the resource`})
        }

        next()
    }
}