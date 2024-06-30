import { Application, NextFunction, Request, Response } from "express"
import { AsyncHandler } from "./AsyncHandler"
import { User } from "../models/user.models"
import { CustomError } from "../utils/customError"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { File } from "../models/file.models"
import { string } from "zod"



declare module 'express' {
    interface Request {
      user?: string; 
    }
  }

export const newUser = AsyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {username, password}:{username:string,password:string} = req.body
    const userInfo = await User.findOne({
        username : username
    })

    if(userInfo)
    {
        return next(new CustomError(409,"username already exists"))
    }

    const hashPassword = await bcrypt.hash(password,12)
    const newUser = await User.create({
        username,
        password : hashPassword
    })

    await newUser.save()

    res.json({
        success : true,
        message : "New Account created"
    })
})

export const loginUser = AsyncHandler(async (req,res,next) => {
    const {JWT_SECRET} = process.env 

    console.log(JWT_SECRET)

    if(typeof JWT_SECRET === 'undefined')
        return next(new CustomError(500,"Missing Secret"))

    const {username, password}:{username:string,password:string} = req.body

    const userInfo = await User.findOne({
        username : username,
    }).select('+password')

    if(!userInfo)
    {
        return next(new CustomError(404,"user not found"))
    }
    
    const isAuthenticated = await bcrypt.compare(password,userInfo.password)

    if(!isAuthenticated)
    {
        return next(new CustomError(404,"password incorrect"))
    }

    const token = jwt.sign(userInfo._id.toString(), JWT_SECRET)
    
    res.cookie("token",token,{
        maxAge : 100*60*60*24*15,
        sameSite : "lax"
    }).status(200).json({
        success:true,
        message:`welcome,${userInfo.username}`
    })



})

export const getMyFiles = AsyncHandler(async (req,res) => {

    const userId = req.user

    const page = parseInt(req.query.page as string,10) || 1
    const limit = 20
    const skip = (page - 1)*limit


    const myFiles = await File.find({
        owner : userId
    }).skip(skip).limit(limit)

    const myTotalFiles = await File.countDocuments({
        owner : userId
    })

    const totalPages = Math.ceil(myTotalFiles/limit)

    res.json({
        success : true,
        count : myFiles.length,
        page,
        totalPages,
        files : myFiles
    })
})

export const getMyDetails = AsyncHandler(async (req,res,next) => {

    const userDetails = await User.findById(req.user)

    if(!userDetails)
        return next(new CustomError(404,"Details were not found"))

    res.json({
        success : true,
        user : userDetails
    })
})

export const logout = AsyncHandler(async (req,res,next) => {
    const {token} = req.cookies

    if(!token)
        return next(new CustomError(400,"Not authorized"))
    
        res.cookie("token","",{
            expires : new Date(0)
        })

        res.status(200).json({
            success : true,
            message : "Logged out successfully"
        })
})