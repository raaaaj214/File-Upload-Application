import mongoose from "mongoose"


export const connectToDB = () =>{
    
    const {MONGO_URI} = process.env as NodeJS.ProcessEnv

    if(typeof MONGO_URI === "undefined")
        return ;

    mongoose.connect(MONGO_URI,({
        dbName : "Fileupload-app",
    }))
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err:Error) => {
        console.log(err.message)
    })
}