import { UserResponseDTO } from "../DTO/UserDTO.mjs";
import UserDB from "../Models/UserModel.mjs";
import bcrypt from "bcrypt"
import { Exceptions } from "../Utils/exceptions.mjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserRoles, UserStatus } from "../Utils/enums.mjs";

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

const getAllUser = async () => {

    const savedInfos = await UserDB.find({});

    const abstractedSavedInfos = savedInfos.map(userInfo => UserResponseDTO(userInfo , "AbstractedUserInfo Admin View"))

    return abstractedSavedInfos
}
const loginUser = async (userInfo) => {
    const savedInfo = await UserDB.findOne({email : userInfo.email})

    console.log(savedInfo)
    

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    const IsValid = await bcrypt.compare(userInfo.password,savedInfo.password)

    if(!IsValid){
        throw new Error(Exceptions.UnAuthorised.msg)
    }

    const token = jwt.sign({id : savedInfo._id,email : savedInfo.email,role : savedInfo.role,status : savedInfo.status},process.env.JWT_SECRET,{expiresIn : "1hr"});  

    return token;
}

const getUserById = async (id) => {
    
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    return UserResponseDTO(savedInfo,"UserFound")
}

const UpdateUserRole = async (id , newRole) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    savedInfo.role = newRole
    
    await savedInfo.save()

    return UserResponseDTO(savedInfo,"UserRoleUpdated")
}

const UpdateStatus = async (id) => {
    const savedInfo = await UserDB.findById(id)
    
    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    if(savedInfo.status === UserStatus[0]){
        savedInfo.status = UserStatus[1]
    }
    else{
        savedInfo.status = UserStatus[0]
    }
     
    await savedInfo.save()

    return UserResponseDTO(savedInfo,UserStatusUpdated)
}

const UpdatePassword = async (id , oldPass, newPass) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }
    
    const passCheck = await bcrypt.compare(oldPass,savedInfo.password)

    if(!passCheck){
        throw new Error(Exceptions.UnAuthorised.msg)
    }

    savedInfo.password = await bcrypt.hash(newPass,10)

    return UserResponseDTO(savedInfo,"UserPasswordUpdated")

}

const UpdateEmail = async (id, newEmail) => {
    const savedInfo = await UserDB.findById(id)

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    savedInfo.email = newEmail

    await savedInfo.save()

    return UserResponseDTO(savedInfo , "UserMailUpdated")
}

const DeleteUser = async (id) => {
    const deletedUser = await UserDB.findByIdAndDelete(id)
    if(!deletedUser) {
        throw new Error(Exceptions.UserNotFound.msg)
    }
}

export default {createUser,getUserById,UpdateUserRole,UpdateEmail,UpdatePassword,UpdateStatus,DeleteUser,loginUser,getAllUser}
