import {Schema,model} from "mongoose"

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    files : {
        type : [{
            type : Schema.Types.ObjectId,
                    ref : "File"
        }],

    }

},{
    timestamps : true
})

export const User = model("User",userSchema)