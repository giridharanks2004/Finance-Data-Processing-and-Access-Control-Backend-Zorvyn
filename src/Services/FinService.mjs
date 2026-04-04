import FinanceDB from "../Models/FInanceModel.mjs";
import { Exceptions } from "../Utils/exceptions.mjs";

const getAllFinRecords = async (Userid) => {
    if(!Userid){
        const AllfinRecords = await FinanceDB.find({})
        return AllfinRecords
    }
    const finRecords = await FinanceDB.find({userId : Userid})
    return finRecords
}

const createFinanceRecord = async (UserId, newRecord) => {
    const newData = {
        userId : UserId,
        ...newRecord
    }
    try {
        const saved = await FinanceDB.create(newData)
        return saved
    } catch (e) {
        throw new Error(e.message)
    }
}
const updateAmount = async (RecordId , UserId , newAmount) => {
    try {
        const savedRecord = await FinanceDB.findOne({_id : RecordId , userId : UserId})
        
        if(!savedRecord){
            throw new Error(Exceptions.Finance.FinanceRecordNotFound.msg)
        }
        savedRecord.amount = newAmount
        await savedRecord.save()
        return savedRecord
    } catch (e) {
        throw new Error(e.message)
    }
}
const updateRecordType = async (RecordId , UserId , newRecordType) => {
    try {
        const savedRecord = await FinanceDB.findOne({_id : RecordId , userId : UserId})
        
        if(!savedRecord){
            throw new Error(Exceptions.Finance.FinanceRecordNotFound.msg)
        }
        savedRecord.RecordType = newRecordType
        await savedRecord.save()
        return savedRecord
    } catch (e) {
        throw new Error(e.message)
    }
}
const updateCategory = async (RecordId , UserId , newCategory) => {
    try {
        const savedRecord = await FinanceDB.findOne({_id : RecordId , userId : UserId})
        
        if(!savedRecord){
            throw new Error(Exceptions.Finance.FinanceRecordNotFound.msg)
        }
        savedRecord.Category = newCategory
        await savedRecord.save()
        return savedRecord
    } catch (e) {
        throw new Error(e.message)
    }
}
const updateDescription = async (RecordId , UserId , newDesc) => {
    try {
        const savedRecord = await FinanceDB.findOne({_id : RecordId , userId : UserId})
        
        if(!savedRecord){
            throw new Error(Exceptions.Finance.FinanceRecordNotFound.msg)
        }
        savedRecord.description = newDesc
        await savedRecord.save()
        return savedRecord
    } catch (e) {
        throw new Error(e.message)
    }
}
export default {getAllFinRecords,createFinanceRecord,updateAmount,updateRecordType,updateCategory,updateDescription}