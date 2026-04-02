import mongoose from "mongoose";
import { UserRoles, UserStatus } from "../Utils/enums.mjs";

const UserModelSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"],
        index : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : UserRoles,
        required : true
    },
    status : {
        type : String,
        enum : UserStatus,
        default : "ACTIVE"

    }
})

export default mongoose.model("UserInformations",UserModelSchema)   