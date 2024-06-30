import {Link, redirect, useNavigate} from "react-router-dom"
import { Menu as MenuIcon } from "@mui/icons-material"
import { userApi } from "../redux/api"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { userExists } from "../redux/userSlice"


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = userApi.useGetUserQuery();
  const [AttemptLogout , {data,isLoading,isSuccess}] = userApi.useLazyLogoutUserQuery()

  const logoutUser =  async () => {
    AttemptLogout().then(res =>{ 
      if(res.data?.success === true)
        {
          toast.success(res.data?.message!)
          refetch().then (({data})  => {

          if (data?.success) {
            if(data.user)
             dispatch(userExists(data.user));
            navigate("/login");
          }
        })
        }
    else
    toast.error(res.data?.message!)

    }).catch(err => toast.error(err))
  }

  return (
    <div className='w-full flex justify-between items-center h-16 px-8'>
        <Link to={"/"} className="font-bold text-xl text-blue-600">File Upload</Link>
        <div className="md:hidden">
        <MenuIcon fontSize="large" color="primary" />
        </div>
        <nav className="hidden md:flex gap-8 font-satoshi font-medium">
            <Link to={"/"}>Files</Link>
            <Link to={"/upload-a-file"}>Upload New</Link>
            <button className="bg-blue-600 px-4 py-1 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed" onClick={logoutUser} disabled={isLoading}>Logout</button>
        </nav>
    </div>
  )
}

export default Header