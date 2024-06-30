import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { stat } from "fs";

export const ErrorHandler = (error:CustomError,req:Request,res:Response,next:NextFunction) => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Something went wrong"
    res.json({
        statusCode : statusCode,
        success : false,
        message : message
    })
}