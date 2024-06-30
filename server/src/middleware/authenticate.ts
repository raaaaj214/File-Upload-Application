import { JsonWebTokenError } from "jsonwebtoken";
import { AsyncHandler } from "../controllers/AsyncHandler";
import { User } from "../models/user.models";
import { CustomError } from "../utils/customError";
import jwt from "jsonwebtoken"

interface MyCookies {
    token?: string;
    // Add other cookie properties here if needed
}
export const isAuthenticated = AsyncHandler(async (req,res,next)=>{

    // const {JWT_SECRET} = process.env

    // if(!JWT_SECRET)
    //     {
    //         return next(new CustomError(404,"Secret missing"))
    //     }

    const {token} : MyCookies = req.cookies

    if(!token)
    {
        return next(new CustomError(400,"Not authorized"))
    }

    const decodedToken = jwt.decode(token)

    const user = await User.findById(decodedToken)

    if(!user){
        return next(new CustomError(400,"not authorized"))
    }

    req.user = user._id.toString()

    next()
})