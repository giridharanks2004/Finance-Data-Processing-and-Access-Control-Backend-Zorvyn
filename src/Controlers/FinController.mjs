import mongoose from "mongoose";
import FinService from "../Services/FinService.mjs";
import { UserRoles } from "../Utils/enums.mjs";
import { matchedData } from "express-validator";
import { Exceptions } from "../Utils/exceptions.mjs";

const CheckObjectId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return false
    }
    return true
}

export const getAllFinRecords = async (req,res) => {
    const payload = req.user
    if(!CheckObjectId(payload.id)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }
    try {
        const {page = 1 ,limit = 3,category,type,currency} = req.query



        if([UserRoles[0],UserRoles[1]].includes(payload.role)){
            const AllfinRecords = await FinService.getAllFinRecords(null,{page,limit,category,type,currency})
            return res.status(200).json(AllfinRecords)
        }

        const finRecords = await FinService.getAllFinRecords(payload.id,{page,limit,category,type,currency})
        return res.status(200).json(finRecords)

    } catch (e) {
        return res.status(500).json({
            error : "internal server error",
            msg : e.message
        })
    }
}

export const createFinanceRecord = async (req,res) => {
    const payload = req.user
    if(!CheckObjectId(payload.id)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }
    try {
        
        const saved = await FinService.createFinanceRecord(payload.id,matchedData(req))

        return res.status(201).json(saved)
        

    } catch (e) {
        return res.status(500).json({
            error : "internal server error",
            msg : e.message
        })
    }
}

export const updateAmount = async (req,res) => {
    const payload = req.user
    const recordId = req.params.id
    const {newAmount} = matchedData(req)
    if(!CheckObjectId(payload.id) || !CheckObjectId(recordId)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }

    try{
        const saved = await FinService.updateAmount(recordId,payload.id,newAmount)
        return res.status(200).json(saved)
    } catch(e){
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }

        return res.status(500).json({
            error : "Internal Server Error",
            status : 500
        })
    }
}

export const updateRecordType = async (req,res) => {
    const payload = req.user
    const recordId = req.params.id
    const {newRecordType} = matchedData(req)
    if(!CheckObjectId(payload.id) || !CheckObjectId(recordId)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }
    try{
        const saved = await FinService.updateRecordType(recordId,payload.id,newRecordType)
        return res.status(200).json(saved)
    } catch(e){
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }

        return res.status(500).json({
            error : "Internal Server Error",
            status : 500
        })
    }
}

export const updateCategory = async (req,res) => {
    const payload = req.user
    const recordId = req.params.id
    const {newCategory} = matchedData(req)
    if(!CheckObjectId(payload.id) || !CheckObjectId(recordId)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }
    try{
        const saved = await FinService.updateCategory(recordId,payload.id,newCategory)
        return res.status(200).json(saved)
    } catch(e){
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }

        return res.status(500).json({
            error : "Internal Server Error",
            status : 500
        })
    }
}

export const updateDescription = async (req,res) => {
    const payload = req.user
    const recordId = req.params.id
    const {newDesc} = matchedData(req)
    if(!CheckObjectId(payload.id) || !CheckObjectId(recordId)){
        return res.status(400).json({
            msg : "object id requred to access"
        })
    }
    try{
        const saved = await FinService.updateDescription(recordId,payload.id,newDesc)
        return res.status(200).json(saved)
    } catch(e){
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }

        return res.status(500).json({
            error : "Internal Server Error",
            status : 500
        })
    }
}
export const DeleteFinance = async (req,res) => {
    const payload = req.user
    const recordId = req.params.id
    if(!CheckObjectId(payload.id)){
        return res.status(400).json({
            msg : "send a proper object id for proper updation"
        })
    }

    try {
        await FinService.DeleteFinance(payload.id,recordId)
        res.status(204).json({
            msg : `${recordId} is deleted`
        })
        
    } catch (e) {
        if(e.message === Exceptions.Finance.UserNotFound.msg){
            return res.status(404).json(Exceptions.Finance.UserNotFound)
        }
        if(e.message === Exceptions.Finance.UnAuthorised.msg){
            return res.status(404).json(Exceptions.Finance.UnAuthorised)
        }
        
        return res.status(500).json({
            status : 500,
            error : "Internal Server Error",
            msg : e.message

        })
    }
}