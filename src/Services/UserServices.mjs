import { UserResponseDTO } from "../DTO/UserDTO.mjs";
import UserDB from "../Models/UserModel.mjs";
import bcrypt from "bcrypt"
import { Exceptions } from "../Utils/exceptions.mjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserRoles, UserStatus } from "../Utils/enums.mjs";
import FinService from "./FinService.mjs";
dotenv.config()

const createUser = async (userInfo) => {
    const encryptedPwd = await bcrypt.hash(userInfo.password,10)
    let message = "UserCreated"
    
    if(userInfo.role === UserRoles[0]){
        userInfo.role = UserRoles[2]
        message = "UserCreated with role being USER request for ADMIN updation to admin"
    }

    userInfo.password = encryptedPwd

    const saved = await UserDB.create(userInfo)

    return UserResponseDTO(saved , message)
}

const getAllUser = async (paginationInfo) => {
    let filter = {}
    if(paginationInfo.status){
        filter.status = paginationInfo.status
    }

    if(paginationInfo.role){
        filter.role = paginationInfo.role
    }
    const page = Math.max(1,paginationInfo.page || 1)
    const limit = Math.max(1,paginationInfo.limit || 10)
    const totalDocs = await UserDB.countDocuments(filter)
    const totalPages = Math.ceil(totalDocs / limit)
    if(paginationInfo.page > totalPages){
        paginationInfo.page = 1
    }
    const skip = (page - 1) * limit
    const savedInfos = await UserDB.find(filter).limit(limit).skip(skip);
    
    const abstractedSavedInfos = savedInfos.map(userInfo => UserResponseDTO(userInfo , "AbstractedUserInfo Admin View"))

    return {
        data : abstractedSavedInfos,
        page : paginationInfo.page,
        totalPages,
        queryfiltersApplied : {
            role : filter.role || `allowed roles [${UserRoles}]`,
            status : filter.status || `allowed status [${UserStatus}]`,
        }
    }
}
const loginUser = async (userInfo) => {
    const savedInfo = await UserDB.findOne({email : userInfo.email})
    

    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }

    const IsValid = await bcrypt.compare(userInfo.password,savedInfo.password)

    if(!IsValid){
        throw new Error(Exceptions.Users.UnAuthorised.msg)
    }

    const token = jwt.sign({id : savedInfo._id,email : savedInfo.email,role : savedInfo.role},process.env.JWT_SECRET,{expiresIn : "24hr"});  

    return token;
}

const getUserById = async (id) => {
    
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }

    return UserResponseDTO(savedInfo,"UserFound")
}

const UpdateUserRole = async (id , newRole) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }

    savedInfo.role = newRole
    
    await savedInfo.save()

    return UserResponseDTO(savedInfo,"UserRoleUpdated")
}

const UpdateStatus = async (id) => {
    const savedInfo = await UserDB.findById(id)
    
    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }

    if(savedInfo.status === UserStatus[0]){
        savedInfo.status = UserStatus[1]
    }
    else{
        savedInfo.status = UserStatus[0]
    }
     
    await savedInfo.save()

    return UserResponseDTO(savedInfo,"UserStatusUpdated")
}

const UpdatePassword = async (id , oldPass, newPass) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }
    
    const passCheck = await bcrypt.compare(oldPass,savedInfo.password)

    if(!passCheck){
        throw new Error(Exceptions.Users.UnAuthorised.msg)
    }

    savedInfo.password = await bcrypt.hash(newPass,10)

    await savedInfo.save()

    return UserResponseDTO(savedInfo,"UserPasswordUpdated Login again")

    

}

const UpdateEmail = async (id, newEmail) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }

    savedInfo.email = newEmail

    await savedInfo.save()

    return UserResponseDTO(savedInfo , "UserMailUpdated")
}

const DeleteUser = async (id) => {
    const deletedUser = await UserDB.findByIdAndDelete(id)
    await FinService.deleteAllRecords(id)
    if(!deletedUser) {
        throw new Error(Exceptions.Users.UserNotFound.msg)
    }
}

export default {createUser,getUserById,UpdateUserRole,UpdateEmail,UpdatePassword,UpdateStatus,DeleteUser,loginUser,getAllUser}
