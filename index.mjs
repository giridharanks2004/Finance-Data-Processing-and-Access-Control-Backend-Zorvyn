import express from "express"
import dotenv from "dotenv"
dotenv.config()

import { dbConnect } from "./src/Utils/dbConnect.mjs"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app = express()

const PORT = process.env.PORT || 3006

app.listen(PORT,()=>{
    console.log(`app started and running at port ${PORT}`)
})

await dbConnect()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/",(req,res)=>{
    res.status(200).json({
        msg : "welcome to the finance api"
    })
})

