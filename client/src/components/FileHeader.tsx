import React from 'react'
import { Link } from 'react-router-dom'
import { FileType } from '../types/types'

const FileHeader = ({file}:{file? : FileType}) => {
  
  return (
    <div className='w-full flex justify-between items-center h-16 px-8'>
        <Link to={"/"} className="font-bold text-xl text-blue-600">File Upload</Link>
        <div className="md:hidden">
        
        </div>
        <div className="flex gap-8 font-satoshi font-medium">
           <a href={file?.downloadUrl} download className='text-lg text-blue-500 cursor-pointer'>Download File</a>
        </div>
    </div>
  )
}

export default FileHeader