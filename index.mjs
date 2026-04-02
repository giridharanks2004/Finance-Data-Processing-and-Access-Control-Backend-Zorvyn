import express from "express"
import dotenv from "dotenv"
dotenv.config()

import { dbConnect } from "./src/Utils/dbConnect.mjs"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import UserRouter from "./src/Routes/UserRoutes.mjs"

const app = express()

const PORT = process.env.PORT || 3006

dbConnect()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(UserRouter)


app.listen(PORT,()=>{
    console.log(`app started and running at port ${PORT}`)
})


app.get("/",(req,res)=>{
    res.status(200).json({
        msg : "welcome to the finance api"
    })
})

