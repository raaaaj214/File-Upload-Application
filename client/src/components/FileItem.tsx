import React, { SetStateAction, useState } from 'react';
import { FileType } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "./ui/context-menu"
import toast from 'react-hot-toast';
import { fileApi, userApi } from '../redux/api';
import { addFiles } from '../redux/fileSlice';
import { useDispatch } from 'react-redux';

const FileItem = ({file}:{file : FileType}) => {
  const dispatch = useDispatch()
  const [deleteFile,{isLoading}] = fileApi.useDeleteFileMutation()
  const [getFiles] = userApi.useLazyGetMyFilesQuery()
  const [contextMenu,setContextMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  const fileClickHandler = () => {
    navigate(`/file/${file.imageId}`)
  }

  const copyToClipBoardHandler = () => {
    navigator.clipboard.writeText(`http://192.168.1.13:5173/file/${file.imageId}`).then(() => toast.success("Text copied to clipboard"))
  }

  const deleteFileHandler = () => {
    deleteFile(file.imageId).then((res):void => {
      if(res?.data?.success)
        {
          toast.success(res.data.message)
          getFiles().then(res => dispatch(addFiles(res.data?.files))).catch(err => toast.error("Couldnt fetch files"))
        }
      else
        toast.error(res.data?.message || "Something went wrong")
    }).catch(err => toast.error("Couldnt delete file"))
  }
  return (
    <ContextMenu modal={true}>
  <ContextMenuTrigger asChild={true} disabled={isLoading}>
    <div className={`text-sm flex w-full h-2 justify-between items-center border-b border-black p-4 px-1 sm:px-2 pl-4 py-5 overflow-hidden cursor-pointer hover:bg-slate-400`} onDoubleClick={fileClickHandler} aria-disabled={isLoading}>
      {
        isLoading && <div className='bg-black/[0.8] w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-50 text-white font-bold text-2xl'>Deleting</div>
      }
      <div className='text-black w-1/2 overflow-hidden whitespace-nowrap text-ellipsis pr-10'>
       {file.name}
      </div>
      <div className='text-black w-1/2 sm:w-1/4 text-center'>{file.type}</div>
      <div className='text-black w-1/4 hidden sm:block text-center'>{file.size}</div>
    </div>
    </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem><Link to={`/file/${file.imageId}`} target='_self'>Open</Link></ContextMenuItem>
    <ContextMenuItem><Link to={`/file/${file.imageId}`} target='_blank'>Open in new tab</Link></ContextMenuItem>
    <ContextMenuItem>
      <a href={file.downloadUrl} download>Download</a>
    </ContextMenuItem>
    <ContextMenuItem onClick={copyToClipBoardHandler}>Copy to clipboard</ContextMenuItem>
    <ContextMenuItem onClick={deleteFileHandler}>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
  );
};

export default FileItem;
