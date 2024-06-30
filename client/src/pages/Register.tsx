import { useForm, SubmitHandler } from "react-hook-form"
import { userApi } from "../redux/api"
import { Inputs } from "../types/types"
import toast from "react-hot-toast"
import {useNavigate } from "react-router-dom"


const Register = () => {
  const {register , handleSubmit ,  formState: {errors}} = useForm<Inputs>()
  const [createUser,{isLoading}] = userApi.useCreateUserMutation()
  const navigate = useNavigate()

  const onSubmit : SubmitHandler<Inputs> = async (data) => {
    const res = await createUser(data)
    if(res.data?.success)
      {
        toast.success(res.data.message)
        navigate("/login")
      }else{
        toast.error(res.data?.message || "Something went wrong")
      }
  }
  return (
    <div className='font-satoshi flex justify-center items-center w-full '>
      <div className="h-screen w-1/2 bg-blue-600 rounded-tr-[100px] rounded-br-[100px] justify-center items-center flex-col gap-5  hidden md:flex">
      <h1 className="text-white font-bold text-3xl">File Upload</h1>
      <p className="text-white font-medium">An application where you can share and store files</p>
      </div>
      <div className="h-screen w-full p-5 md:w-1/2 text-black flex justify-center items-center flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col text-lg w-full md:w-4/5 lg:w-1/2 gap-8">
        <input{...register("username",{required : "Username is required"})} placeholder="username" className="border-b border-black focus:outline-none w-full rounded-md px-2"/>
        <input type="password" {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }},)} placeholder="password" className="border-b border-black focus:outline-none w-full rounded-md px-2"/>
        {errors && <p className="text-red-500 text-sm">{[ errors.username?.message ,<br/>,errors.password?.message ]}</p>}
        <button disabled={isLoading} type="submit" className="disabled:bg-gray-400 bg-blue-500 px-10 py-1 font-bold text-white rounded-md text-lg">Register</button>
      </form>
      <h5 className="text-sm font-bold">-OR-</h5>
      <p>Already have a account ? <a href="/login" className="text-blue-500 font-bold">Login</a></p>
      </div>
    </div>
  )
}

export default Register