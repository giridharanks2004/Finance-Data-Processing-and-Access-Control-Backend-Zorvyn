import { Router } from "express";
import { createUser, getAllUser, getUserById, loginUser, logoutUser, updateUserEmail, updateUserStatus, updateUserPassword, getUserDetails, updateUserRole, deleteUser } from "../Controlers/UserController.mjs";
import { CheckToken, RoleCheck, ValidationResultCheck } from "../Utils/middlewares.mjs";
import { UserRoles } from "../Utils/enums.mjs";
import { checkSchema } from "express-validator";
import { UserAuthValidation, UserCreationValidationSchema, UserUpdationValidationSchema } from "../Utils/validations.mjs";

const router = Router()


router.get("/api/users",CheckToken,RoleCheck(UserRoles[0]),getAllUser)
router.get("/api/auth/logout",logoutUser)
router.get("/api/users/me",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),getUserDetails)
router.get("/api/users/:id",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),getUserById)


router.post("/api/auth/register",checkSchema(UserCreationValidationSchema),ValidationResultCheck,createUser)
router.post("/api/auth/login",checkSchema(UserAuthValidation),loginUser)

router.patch("/api/users/me/email",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(UserUpdationValidationSchema),ValidationResultCheck,updateUserEmail)
router.patch("/api/users/me/status",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(UserUpdationValidationSchema),ValidationResultCheck,updateUserStatus)
router.patch("/api/users/me/password",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(UserUpdationValidationSchema),ValidationResultCheck,updateUserPassword)
router.patch("/api/users/:id/role",CheckToken,RoleCheck(UserRoles[0]),checkSchema(UserUpdationValidationSchema),ValidationResultCheck,updateUserRole)

router.delete("/api/users/me/delete",CheckToken,deleteUser)


export default router;