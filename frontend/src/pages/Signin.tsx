import type { signinInputType } from "@yashxdev/commons";
import Heading from "../components/Heading"
import LabelledInput from "../components/LabelledInput"
import Quote from "../components/Quote"
import { useState } from "react";
import Button from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailAtom, userIdAtom, userNameAtom } from "../store/atoms";


function Signin() {
  const [user,setUser] = useRecoilState(userNameAtom)
  const [email,setEmail] = useRecoilState(emailAtom)
  const [postInputs, setPostInputs] = useState<signinInputType>({
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


      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
      const jwt = response.data;
      sessionStorage.setItem("token", jwt.jwt);
      setUser(jwt.name?.toLocaleUpperCase() || "Guest User")
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
              <Heading customClassname="text-center mb-1 text-3xl 2xl:text-5xl font-extrabold" label="Sign in with Email " />
              <Heading customClassname="text-center text-sm 2xl:text-3xl font-light text-slate-400" label="Don't have an account?" links={{ text: "Sign up", to: "/signup" }} />
            </div>

            <div className=" grid gap-5 mt-4">

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

              <div className="pb-5">
                <Button  onclick={sendRequest} label="Sign in" type="submit" />
              </div>  
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

export default Signin