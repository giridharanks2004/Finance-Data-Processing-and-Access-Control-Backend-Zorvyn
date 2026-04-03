import FinanceDB from "../Models/FInanceModel.mjs";

const getAllFinRecords = async (Userid) => {
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

export default {getAllFinRecords,createFinanceRecord}