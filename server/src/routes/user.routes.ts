import {Request,Response,Router} from "express"
import { getMyDetails, getMyFiles, loginUser, logout, newUser } from "../controllers/user.controller"
import { isAuthenticated } from "../middleware/authenticate"

const router = Router()

router.post("/new" , newUser)

router.post("/login" , loginUser)

router.use(isAuthenticated)

router.get("/me",getMyDetails)

router.get("/getmyfiles" , getMyFiles)

router.get("/logout",logout )

export default router