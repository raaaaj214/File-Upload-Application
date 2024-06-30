import { useEffect, useState } from 'react';
import DragDrop from '../components/DrapAndDrop'
import Header from '../components/Header'
import toast from 'react-hot-toast';
import { fileApi } from '../redux/api';

const FileUpload = () => {
  const [UploadFiles,{isLoading}] = fileApi.useUploadFilesMutation()
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (files : File[]) => {
    setFiles((prev) => [...prev,...files]);
  };

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files)
      return toast.error("Please Upload a File")

    const files = Array.from(e.target.files)
    setFiles((prev) => [...prev,...files])
    console.log("come on")

  }
  const clearFilesHandler = () => {
    if(files.length <= 0)
      return toast.error("0 files cleared")
    else{
      const filesCount = files.length
      setFiles([])
      toast.success(`${filesCount} files cleared`)

    }
  }

  const UploadFilesHandler = () => {
    const formData = new FormData()
    if(files.length <= 0)
      return toast.error("Please select a file to upload")

    if(files.length > 20)
      return toast.error("You can upload only 20 items at once")

    files.map(file => formData.append("files",file))

    UploadFiles(formData).then((res) => {
      if(res.data?.success === true)
        {
          console.log(res)
          toast.success("Files Uploaded successfully")
          setFiles([])
        }
      else
        toast.error(res.data?.message || "Something went wrong")
    })


  }

  return (
    <div className='font-satoshi flex justify-center items-center w-full flex-col px-5 '>
      <Header/>
      <div className='flex w-full gap-4 max-w-[1400px] bg-blue-100 mt-10 min-h-[82dvh] max-h-[82dvh] h-full rounded-lg px-5 pb-2  flex-col overflow-y-auto relative'>
        <div className='p-4 flex justify-end items-center gap-8 sticky top-0 z-50 bg-blue-100 '>
          <button onClick={UploadFilesHandler}>Upload</button>
          <label htmlFor='files'>Select</label>
          <button className='' onClick={clearFilesHandler}>Clear All</button>
        </div>
          <input type="file" multiple name="files" id="files" className='hidden'onChange={changeHandler}/>
        <DragDrop handleChange={handleChange} files={files} setFiles={setFiles} isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default FileUpload