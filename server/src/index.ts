import { config } from "dotenv"

// allows access to env variabeles
config()

import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import userRouter from "./routes/user.routes"
import fileRouter from "./routes/file.routes"
import { connectToDB } from "./utils/database"
import { ErrorHandler } from "./controllers/ErrorHandler"
import { CustomError } from "./utils/customError"
import cookieParser from "cookie-parser"


const app = express()




app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","PATCH","DELETE"],
    credentials : true,
}))
app.use(cookieParser())
app.use(express.json())


app.use("/user",userRouter)
app.use("/file",fileRouter)
app.use("*" , (req:Request,res:Response,next:NextFunction) => {
    next(new CustomError(404,"This route doesn't exist"))
})

app.use(ErrorHandler)

app.listen(process.env.PORT,()=>{
    console.log("Server started")
})

connectToDB()
