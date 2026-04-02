import { UserResponseDTO } from "../DTO/UserDTO.mjs";
import UserDB from "../Models/UserModel.mjs";
import bcrypt from "bcrypt"
import { Exceptions } from "../Utils/exceptions.mjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserStatus } from "../Utils/enums.mjs";

dotenv.config()

const createUser = async (userInfo) => {
    const encryptedPwd = await bcrypt.hash(userInfo.password,10)

    userInfo.password = encryptedPwd

    const saved = await UserDB.create(userInfo)

    return UserResponseDTO(userInfo, "UserCreated")
}

const getAllUser = async () => {

    const savedInfos = await UserDB.find({});

    const abstractedSavedInfos = savedInfos.map(userInfo => UserResponseDTO(userInfo , "AbstractedUserInfo Admin View"))

    return abstractedSavedInfos
}
const loginUser = async (userInfo) => {
    const savedInfo = await UserDB.find({email : userInfo.email})

    if(!savedInfo){
        throw new Error(Exceptions.UserNotFound.msg)
    }

    const IsValid = await bcrypt.compare(userInfo.password,savedInfo.password)

    if(!IsValid){
        throw new Error(Exceptions.UnAuthorised.msg)
    }

    const token = jwt.sign({
        id : userInfo._id,
        email : userInfo.email,
        role : userInfo.role,
        status : userInfo.status,
    },process.env.JWT_SECRET);

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
