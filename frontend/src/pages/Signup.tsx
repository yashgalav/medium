import { useState } from "react";
import LabelledInput from "../components/LabelledInput";
import Quote from "../components/Quote";
import type { signupInputType } from "@yashxdev/commons";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bounce, toast } from "react-toastify";
import { emailAtom,  userNameAtom } from "../store/atoms";
import { useRecoilState } from "recoil";


export default function Signup() {
  const [,setUser] = useRecoilState(userNameAtom)
  const [,setEmail] = useRecoilState(emailAtom)
  const [postInputs, setPostInputs] = useState<signupInputType>({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();



  async function sendRequest() {
    try {

      if (!postInputs.email.trim()) {
        toast.error("Email is required");
        return; // Save a network request
      }
      if (!postInputs.password.trim()) {
        toast.error("Password is required");
        return; // Save a network request
      }
      
      
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
      const jwt = response.data;
      sessionStorage.setItem("token", jwt.jwt);
      setUser(postInputs.name?.toLocaleUpperCase() || "Guest User")
      setEmail(postInputs.email || "Guest User")
      sessionStorage.setItem("userId",jwt.userId)
      navigate("/blogs")

    } catch (ex: any) {
      const errorMessage = ex.response?.data?.message || ex.message || "Something went wrong!";

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">

      <div >
        <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex-col  items-center border-b ">
          
          <div className="px-8">
            <Heading customClassname="text-3xl mb-1 2xl:text-5xl font-extrabold"  label="Create an account " />
            <Heading customClassname="text-center text-sm 2xl:text-3xl font-light text-slate-400" label="Already have an account?"   links={{text:"Sign in", to:"/signin"}} />
          </div>

          <div className=" grid gap-5 mt-4 ">
            <LabelledInput label="Name" placeholder="Yash Kumar..." onChange={(e) =>
              setPostInputs({
                ...postInputs,
                name: e.target.value
              })
            } />
            <LabelledInput label="Email" placeholder="yash@gmail.com" onChange={(e) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value.toLocaleLowerCase()
              })
            } />
            <LabelledInput label="Password" type="password" placeholder="@#jhdfd(.ds" onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            } />

            <Button onclick={sendRequest} label="Sign up" type="submit"/>
          </div>
        </div>

         <Heading customClassname="text-center text-sm 2xl:text-3xl mt-5 font-light text-slate-400" label="" links={{ text: "Or Continue as Guest (Read-Only)", to: "/blogs" }} />
          
      </div>
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}
