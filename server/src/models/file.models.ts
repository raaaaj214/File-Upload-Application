import {Schema,model} from "mongoose"

const fileSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    imageId : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    downloadUrl : {
        type : String,
        required : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

export const File = model("File",fileSchema)