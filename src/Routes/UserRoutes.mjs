import { Router } from "express";
import { createUser, getAllUser, getUserById, loginUser, logoutUser } from "../Controlers/UserController.mjs";
import { CheckToken, RoleCheck } from "../Utils/middlewares.mjs";
import { UserRoles } from "../Utils/enums.mjs";
import { checkSchema } from "express-validator";
import { UserAuthValidation, UserCreationValidationSchema } from "../Utils/validations.mjs";

const router = Router()


router.get("/api/users",CheckToken,RoleCheck(UserRoles[0]),getAllUser)
router.get("/api/users/:id",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),getUserById)
router.post("/api/auth/register",checkSchema(UserCreationValidationSchema),createUser)
router.post("/api/auth/login",checkSchema(UserAuthValidation),loginUser)
router.get("/api/auth/logout",logoutUser)


export default router;