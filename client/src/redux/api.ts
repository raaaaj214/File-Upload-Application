import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FileType, Inputs, fileResponse, user, userResponse } from '../types/types'


type UserResponse = {
    success : boolean,
    message : string,
}

type getAllFilesResponse = {
    success : false,
    count : number,
    page :  number,
    totalPage :  number,
    files : FileType[]
}
export const userApi = createApi({
    reducerPath :"userapi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:3000/",
        credentials : "include"
    }),
    endpoints : (builder) => ({
        getUser : builder.query<userResponse,void>(
            {
                query : () => "user/me",
                keepUnusedDataFor : 0

            }
        ),
        createUser : builder.mutation<UserResponse,Inputs>({
            query : (body) => ({
                url : "user/new",
                method : "POST",
                body
            })
        }),
        loginUser : builder.mutation<UserResponse,Inputs>({
            query : (body) => ({
                url : "user/login",
                method : "POST",
                credentials : "include",
                body,
            })
        }),
        getMyFiles : builder.query<getAllFilesResponse,void>({
            query : () => "/user/getmyfiles",
            keepUnusedDataFor : 0
        }),
        logoutUser : builder.query<UserResponse,void>({
            query : () => "user/logout"
        })
    })
})

export const fileApi = createApi({
    reducerPath :"fileapi",
    baseQuery :  fetchBaseQuery({
        baseUrl : "http://localhost:3000/",
        credentials : "include"
    }),
    endpoints : (builder)=> ({
        getAFile : builder.query<fileResponse,string>({
           query : (imageUrl : string) => `/file/${imageUrl}`
        }),
        uploadFiles : builder.mutation<UserResponse,FormData>({
            query : (body) => ({
                url : "file/upload",
                method : "POST",
                credentials : "include",
                body,
            })
        }),
        deleteFile : builder.mutation<UserResponse,string>({
            query : (imageId:string) => ({
                url : `file/${imageId}`,
                method : "DELETE",
                credentials : "include",
            })
        })
    })
})