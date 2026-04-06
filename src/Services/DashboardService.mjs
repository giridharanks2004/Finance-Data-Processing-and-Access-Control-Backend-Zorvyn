import UserDB from "../Models/UserModel.mjs";
import FinanceDB from "../Models/FInanceModel.mjs";
import { Exceptions } from "../Utils/exceptions.mjs";
import { ExpenseCategories, FinanceType, UserRoles } from "../Utils/enums.mjs";

const TotalSum = (FinanceList , Type) => {
    if(FinanceType.includes(Type)){
        let sum = 0
        for(let finInfo of FinanceList){
            if(finInfo.RecordType === Type){
                sum = sum + finInfo.amount
            }
        } 
        return sum
    }
    if(ExpenseCategories.includes(Type)){
        let sum = 0
        for(let finInfo of FinanceList){
            if(finInfo.Category === Type){
                sum = sum + finInfo.amount
            }
        } 
        return sum
    }

}

const getUserDashboardInfo = async (id,User) => {
    let UserInfo = null
    if(id){
        UserInfo = await UserDB.findOne({_id : id})
    }
    if(User){
        UserInfo = User
    }
    if(!UserInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }
    const FinanceInfos = await FinanceDB.find({userId : UserInfo.id})

    let summary = {
        email : UserInfo.email,
        role : UserInfo.role,
        status : UserInfo.status,
        financeDetails : {
            TotalIncome : null,
            TotalExpense : null,
            NetBalance : null,
            CategoryWise : {}
        }
    }
    summary.financeDetails.TotalExpense = TotalSum(FinanceInfos,FinanceType[0])
    summary.financeDetails.TotalIncome = TotalSum(FinanceInfos,FinanceType[1])
    summary.financeDetails.NetBalance = summary.financeDetails.TotalIncome - summary.financeDetails.TotalExpense
    summary.financeDetails.CategoryWise.food = TotalSum(FinanceInfos,ExpenseCategories[0])
    summary.financeDetails.CategoryWise.transport = TotalSum(FinanceInfos,ExpenseCategories[1])
    summary.financeDetails.CategoryWise.other = TotalSum(FinanceInfos,ExpenseCategories[2])
    return summary
}

const getAllUserDashboardInfo = async () => {
    const Users = await UserDB.find({role : UserRoles[2]})
    const Data = []
    for(let user of Users){
        const summary = await getUserDashboardInfo(null,user)
        Data.push(summary)
    }
    return Data
}


export default {getUserDashboardInfo,getAllUserDashboardInfo}