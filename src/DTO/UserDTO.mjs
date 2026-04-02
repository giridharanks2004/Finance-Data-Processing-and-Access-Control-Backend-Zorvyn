export const UserResponseDTO = (userInfo , message ) => {
    return {
        id : userInfo._id,
        email : userInfo.email,
        role : userInfo.role,
        status : userInfo.status,
        msg : message
    }
}