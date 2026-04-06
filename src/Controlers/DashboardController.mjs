import DashboardService from "../Services/DashboardService.mjs"
import { Exceptions } from "../Utils/exceptions.mjs"
import { CheckObjectId } from "../Utils/middlewares.mjs"
export const getUserDashboardInfo = async (req,res) => {
    const {page , limit} = req.query
    const {id} = req.params
    if(!CheckObjectId(id)){
        return res.status(400).json({
            msg : "enter proper object id for accessing"
        })
    }
    try {
        const DashboardSummay = await DashboardService.getUserDashboardInfo(id,null)
        return res.status(200).json(DashboardSummay)
    } catch (e) {
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }
        return res.status(500).json({
            err : "internal server error",
            msg : e.message
            
        })
    }
}
export const getAllUserDashboardInfo = async (req,res) => {

    const {page , limit} = req.query
    try {
        const DashboardSummay = await DashboardService.getAllUserDashboardInfo()
        return res.status(200).json(DashboardSummay)
    } catch (e) {
        if(e.message === Exceptions.Finance.FinanceRecordNotFound.msg){
            return res.status(404).json(Exceptions.Finance.FinanceRecordNotFound)
        }
        return res.status(500).json({
            err : "internal server error",
            msg : e.message
            
        })
    }
}