import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "./AsyncHandler";
import { cloudinary } from "../config/cloudinary";
import { File } from "../models/file.models";
import byteSize from "byte-size"
import { CustomError } from "../utils/customError";
import { getDownloadAttachment } from "../utils/features";


export const uploadFile = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadPromises = files.map(file => {
        
        const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
        
        return cloudinary.uploader.upload(dataURI, {
        resource_type : "auto",
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })});

        const results = await Promise.all(uploadPromises);
        console.log(results[0])

        const fileDBRecords = results.map((result, index) => {
            
            const {value,unit} = byteSize(files[index].size)
            const fileNameAndExt = files[index].originalname
            const fileName = fileNameAndExt.split(".")[0]
            return {
            name: fileName,
            size: `${value} ${unit}`,
            type: files[index].mimetype,
            imageId: result.public_id,
            imageUrl: result.secure_url,
            downloadUrl :  getDownloadAttachment(result.public_id,result.resource_type),
            owner: req.user 
        }});

        const DbResults = await File.create(fileDBRecords);

        res.json({
            success: true,
            message: "Files uploaded successfully"
        });

});

export const getFile = AsyncHandler(async (req,res) => {
    const {imageId} = req.params

    const file = await File.findOne({
        imageId : imageId
    })

    if(!file){
        return res.json({
            success : false,
            message : "File doesn't exist"
        })
    }
    else{
        return res.json({
            success : true,
            message : "File fetched successfully",
            file
        })
    } 
    }
)

export const deleteFile = AsyncHandler(async (req,res,next) => {
    const {imageId} = req.params
    const userId = req.user

    const file = await File.findOne({
        imageId : imageId,
        owner : userId
    })

    if(!file){
        return res.json({
            success : false,
            message : "Something is wrong with the details provided"
        })
    }

    const result = await cloudinary.uploader.destroy(imageId)

    if(result.result !== 'ok')
            return next(new CustomError(500,'Failed to delete image from the cloud'))

    await File.deleteOne({
        imageId : imageId
    })

    res.json({
        success: true,
        message: 'File deleted successfully',
    });
})