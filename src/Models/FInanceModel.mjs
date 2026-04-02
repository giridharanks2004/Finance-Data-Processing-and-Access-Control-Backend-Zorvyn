import mongoose from "mongoose";
import { ExpenseCategories, FinanceType } from "../Utils/enums.mjs";

const FinanceModelSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserInformations",
        required : true,
        index : true
    },
    amount : {
        type : Number,
        required : true
    },
    RecordType : {
        type : String,
        enum : FinanceType,
        required : true,
    },
    Category : {
        type : String,
        enum : ExpenseCategories,
        required : true, 
    },
    description : {
        type : String,
        default : ""
    }

},{
    timestamps : true
})

export default mongoose.model("FinanceInformations",FinanceModelSchema)
