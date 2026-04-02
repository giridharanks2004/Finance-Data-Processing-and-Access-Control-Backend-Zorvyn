export const UserResponseDTO = (userInfo , message ) => {
    return {
        email : userInfo.email,
        role : userInfo.role,
        status : userInfo.status,
        msg : message
    }
}