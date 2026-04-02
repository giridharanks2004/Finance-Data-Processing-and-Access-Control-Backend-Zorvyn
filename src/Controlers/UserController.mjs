import UserServices from "../Services/UserServices.mjs" 

export const getAllUser = async (res, req) => {
    
    const users = await UserServices.getAllUser()
    return res.status(200).json(users)

}