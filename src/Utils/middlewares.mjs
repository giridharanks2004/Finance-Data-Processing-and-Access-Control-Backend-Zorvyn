import dotenv from "dotenv"
import { validationResult } from "express-validator"
import mongoose from "mongoose"

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

export const ValidationResultCheck = (req , res , next) => {
    const results = validationResult(req)

    if(!results.isEmpty()){
        return res.status(400).json(results.array())
    }

    next()
}

export const CheckObjectId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return false
    }
    return true
}