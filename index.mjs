import express from "express"
import dotenv from "dotenv"
dotenv.config()

import { dbConnect } from "./src/Utils/dbConnect.mjs"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import FinRouter from "./src/Routes/FinRoutes.mjs"
import UserRouter from "./src/Routes/UserRoutes.mjs"
import DashboardRouter from "./src/Routes/DashboardRoutes.mjs"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/Utils/swagger.mjs"
const app = express()

const PORT = process.env.PORT || 3006

dbConnect()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(DashboardRouter)
app.use(UserRouter)
app.use(FinRouter)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT,()=>{
    console.log(`app started and running at port ${PORT}`)
})


app.get("/",(req,res)=>{
   res.redirect("/api/docs")
})

