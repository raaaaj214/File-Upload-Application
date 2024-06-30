import {Router} from "express"
import { upload } from "../middleware/multer"
import { deleteFile, getFile, uploadFile } from "../controllers/file.controller"
import { isAuthenticated } from "../middleware/authenticate"

const router = Router()
router.get("/:imageId",getFile)

// Authenticated routes
router.use(isAuthenticated)
// All the routes below requires authentication
router.post("/upload",upload.array("files",20),uploadFile)
router.delete("/:imageId",deleteFile)

export default router