import { Router } from "express";
import { CheckToken, RoleCheck, ValidationResultCheck } from "../Utils/middlewares.mjs";
import { UserRoles } from "../Utils/enums.mjs";
import { checkSchema } from "express-validator";
import { FinanceDataValidation, FinanceUpdationDataValidation } from "../Utils/validations.mjs";
import { createFinanceRecord, DeleteFinance, getAllFinRecords, updateAmount, updateCategory, updateDescription, updateRecordType } from "../Controlers/FinController.mjs";


const router = Router()

router.get("/api/users/me/finances",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),getAllFinRecords)

router.post("/api/users/me/finances",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(FinanceDataValidation),ValidationResultCheck,createFinanceRecord)

router.patch("/api/users/me/finances/:id/amount",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(FinanceUpdationDataValidation),ValidationResultCheck,updateAmount)
router.patch("/api/users/me/finances/:id/recordtype",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(FinanceUpdationDataValidation),ValidationResultCheck,updateRecordType)
router.patch("/api/users/me/finances/:id/category",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(FinanceUpdationDataValidation),ValidationResultCheck,updateCategory)
router.patch("/api/users/me/finances/:id/desc",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),checkSchema(FinanceUpdationDataValidation),ValidationResultCheck,updateDescription)

router.delete("/api/users/me/finances/:id",CheckToken,RoleCheck(UserRoles[0],UserRoles[1],UserRoles[2]),DeleteFinance)


//decided not to have a delete option for finance records

export default router