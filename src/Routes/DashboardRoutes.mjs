import { Router } from "express";
import { CheckToken, RoleCheck } from "../Utils/middlewares.mjs";
import { UserRoles } from "../Utils/enums.mjs";
import { getAllUserDashboardInfo, getUserDashboardInfo } from "../Controlers/DashboardController.mjs";

const router = Router()

router.get("/api/users/dashboard",CheckToken,RoleCheck(UserRoles[0],UserRoles[1]),getAllUserDashboardInfo)
router.get("/api/users/:id/dashboard",CheckToken,RoleCheck(UserRoles[0],UserRoles[1]),getUserDashboardInfo)


export default router