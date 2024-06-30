import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FileItem from '../components/FileItem'
import { userApi } from '../redux/api'
import { FileType } from '../types/types'
import { addFiles } from '../redux/fileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import toast from 'react-hot-toast'

const Home = () => {
  const dispatch = useDispatch()
  const [getMyFiles,{isLoading}] = userApi.useLazyGetMyFilesQuery()
  const [selected, setSelected] = useState<FileType[]>([])
  const files = useSelector((state:RootState) => state.file.files)

  useEffect(() => {
    getMyFiles().then(res => {console.log(res.data);dispatch(addFiles(res.data?.files))}).catch(err => toast.error("Couldn't fetch files"))
  },[])

  return (
    <div className='font-satoshi flex justify-center items-center w-full flex-col px-5 '>
      <Header/>
      <div className='flex w-full  max-w-[1400px] bg-blue-100 mt-10 min-h-[82dvh] max-h-[82dvh] h-full rounded-lg px-2 sm:px-5 pb-2  flex-col overflow-y-auto'>
      <div className='sticky top-0 bg-blue-100 flex w-full h-5  justify-between items-center border-b border-black pt-8 pb-4 px-2 '>
        <div className='text-balck font-bold text-lg w-1/2'>Name</div>
        <div className='text-balck font-bold text-lg w-1/2 sm:w-1/4 text-center'>Type</div>
        <div className='text-balck font-bold text-lg w-1/4 hidden sm:block text-center'>Size</div>
      </div>
      <div className='flex flex-col w-full h-full '>
      {isLoading ? <p>Content Loading</p> : files.map(file => <FileItem file={file}  />)}
      </div> 

      </div>
    </div>
  )
}

export default Home