import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Close } from "@mui/icons-material";
import FileCard from "./FileCard";

function DragDrop({handleChange,files,setFiles,isLoading}:{handleChange:(files: File[]) => void , files:File[],setFiles:React.Dispatch<React.SetStateAction<File[]>>,isLoading:boolean}) {

  const fileTypes = ["JPG", "PNG", "GIF","WEBP","MP4","WEBM","MP3","WAV","mp3","wav","aac","flac","ogg","wma","m4a","aiff","alac","opus"];

   
  return (
    <div className=" top-auto left-auto flex-col flex justify-start items-center gap-4 max-w-full h-screen ">
    <div className={`w-full  justify-center hidden md:flex items-center min-h-full ${files.length == 0 ? "md:flex" : "md:hidden"}`}>
    <FileUploader  label="Drop your files here" handleChange={handleChange} name="files"  multiple={true} fileOrFiles types={fileTypes} />
    </div>
    {
        files.map(file => <FileCard file={file} files={files} setFiles={setFiles} isLoading={isLoading}/> )
    }
    </div>
  );
}

export default DragDrop;