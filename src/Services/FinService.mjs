
import FinanceDB from "../Models/FInanceModel.mjs";
import { ExpenseCategories, FinanceType, SupportedCurrencies } from "../Utils/enums.mjs";
import { Exceptions } from "../Utils/exceptions.mjs";

const getAllFinRecords = async (Userid,paginationInfo) => {
    let filter = {}
    let AllfinRecords = []
    if(paginationInfo.category){
        filter.Category = paginationInfo.category
    }
    if(paginationInfo.type){
        filter.RecordType = paginationInfo.type
    }
    if(paginationInfo.currency){
        filter.currency = paginationInfo.currency
    }
    let page = Math.max(1,paginationInfo.page || 1)
    const limit = Math.max(1,paginationInfo.limit || 5)
    

    const totalPages = Math.ceil(await FinanceDB.countDocuments(filter) / limit)

    if(page > totalPages){
        page = 1
    }

    const skip = (page - 1) * limit

    const result = {
        data :  [],
        currentPage : page,
        totalPages,
        queryFiltersApplied : {
            type : filter.RecordType || `allowed types [${FinanceType}]`,
            category : filter.Category || `allowed categories [${ExpenseCategories}]`,
            currency : filter.currency || `allowed currencies [${SupportedCurrencies}]`
        }
    }
    if(!Userid){
        AllfinRecords = await FinanceDB.find(filter).limit(limit).skip(skip)
        result.data = AllfinRecords
        return result
    }
    AllfinRecords = await FinanceDB.find({userId : Userid,...filter}).limit(limit).skip(skip)
    result.data = AllfinRecords
    return result
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

const deleteAllRecords = async (id) => {
    try{
        await FinanceDB.deleteMany({userId : id})
    } catch(e) {
        throw new Error(e.message)
    }
}
const DeleteFinance = async (userId ,recordid) => {
    const deletedRecord = await FinanceDB.deleteOne({_id : recordid , userId : userId})
    console.log(deletedRecord)
    if(!deletedRecord) {
        throw new Error(Exceptions.Finance.FinanceRecordNotFound.msg)
    }
}
export default {getAllFinRecords,createFinanceRecord,updateAmount,updateRecordType,updateCategory,updateDescription,deleteAllRecords,DeleteFinance}