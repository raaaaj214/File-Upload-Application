export type user = {
    _id: string,
        username: string,
        files: [],
        createdAt: string,
        updatedAt: string,
        __v: number
}

export type FileType = {
    _id : string,
    name : string,
    size : string,
    type : string,
    imageId : string,
    imageUrl : string,
    owner  :string,
    createdAt : string,
    updatedAt : string,
    downloadUrl : string
    __v : number
}
export type userResponse = {
    success : boolean,
    statusCode : number,
    message : string,
    user? : user
} 
export type fileResponse = {
    success : boolean,
    statusCode : number,
    message : string,
    file? : FileType
} 

export type Inputs = {
    username : string,
    password : string
  }