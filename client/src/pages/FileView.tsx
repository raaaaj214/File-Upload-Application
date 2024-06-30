import { useParams } from "react-router-dom"
import { fileApi } from "../redux/api"
import FileHeader from "../components/FileHeader"

const FileView = () => {
   const {fileId} = useParams()

   const {data,isSuccess} = fileApi.useGetAFileQuery(fileId!)

  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-10  justify-start items-center font-satoshi overflow-hidden">
      <FileHeader file={data?.file} />
    { isSuccess ?
    (
      

      (data.file?.type.split("/").includes("video") ||  data.file?.type.split("/").includes("audio") ) ? <video className=" w-3/4 h-3/4" controls><source src={data.file.imageUrl}/></video> : <img src={data?.file?.imageUrl} className="object-contain w-3/4 h-3/4" alt="" /> 
    )
      : <p className="text-white">Loading</p>}
    </div>
  )
}

export default FileView