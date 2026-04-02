
import UserServices from "../Services/UserServices.mjs" 
import { matchedData, validationResult } from "express-validator"
import { Exceptions } from "../Utils/exceptions.mjs"
import mongoose from "mongoose"
import { UserRoles } from "../Utils/enums.mjs"

export const getAllUser = async (req, res) => {
    
    const users = await UserServices.getAllUser()
    return res.status(200).json(users)

}

export const createUser = async (req,res) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({...result.array()})
        }
        const saved = await UserServices.createUser(matchedData(req))

        return res.status(200).json(saved)
    } catch (e) {
        if (e.name === "ValidationError") {
            return res.status(400).json({
                msg: "Validation failed",
                errors: e.message
            });
        }

        return res.status(500).json({
            msg : "internal server Error",
            error : e.message
        })
    }
}

export const loginUser = async (req,res) => {
    try {

        const result = validationResult(req)
        
        if(!result.isEmpty()){
            return res.status(400).json({...result.array()})
        }
        
        console.log(req.body)
        const token = await UserServices.loginUser(matchedData(req))
        
        res.cookie("authtoken",token,{maxAge : 60 * 60 * 1000, sameSite : "Strict"})

        return res.status(200).json({
            msg : "logged in successfully"
        })

    } catch (e) {
        if(e.message === Exceptions.UserNotFound.message){
            return res.status(404).json(Exceptions.UserNotFound)
        }
        if(e.message === Exceptions.UnAuthorised.message){
            return res.status(401).json(Exceptions.UnAuthorised)
        }

        return res.status(500).json({
            msg : "internal server Error",
            error : e.message
        })
    }
}

export const getUserById = async (req,res) => {
    try{
        const {id} = req.params

        const  payload = req.user; 
        console.log(payload)
        let savedUser = {}
        
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg : "send a valid id for lookup"
            })
        }

        if([UserRoles[1],UserRoles[2]].includes(payload.role)){

            if(id === payload.id){
                savedUser = await UserServices.getUserById(id)
                return res.status(200).json(savedUser)
            }
            return res.status(403).json({msg : "you are not allowed to access"})
        }

        savedUser = await UserServices.getUserById(id)
        return res.status(200).json(savedUser)
        
    } catch(e){
        if(e.message === Exceptions.UserNotFound.message){
            return res.status(404).json(Exceptions.UserNotFound)
        }
        return res.status(500).json({
            msg : "internal server Error",
            error : e.message
        })
    }
}

export const logoutUser = (req,res) => {
    if(req.cookies.authtoken){
        res.clearCookie("authtoken")
        res.status(200).json({msg : "logged out pls login to continue"})
    }

    res.status(401).json(Exceptions.UnAuthorised)
} 