import { Close } from '@mui/icons-material';
import React from 'react'

const FileCard = ({file,files,setFiles,isLoading}:{file:File,files:File[],setFiles:React.Dispatch<React.SetStateAction<File[]>>,isLoading:boolean}) => {

    const removeAFileHandler = () => {
        const finalFiles = files.filter(fileFromArray => fileFromArray !== file)
        setFiles(finalFiles)
    }

  return (
    <div className={`w-full min-h-20 p-2 flex justify-start items-center bg-blue-900 rounded-lg gap-4 text-white overflow-hidden whitespace-nowrap text-ellipsis aria-disabled:bg-gray-300 `} aria-disabled={isLoading}>
    <button type='button' className="" onClick={removeAFileHandler}>
        <Close color="inherit"/>
    </button>
    {
      file.type.split("/").includes("image") &&
    <img src={URL.createObjectURL(file)} className='w-12 h-12' alt="" />
    }
    <h1>{file.name}</h1>
</div>
  )
}

export default FileCard