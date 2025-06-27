import {  Trash2 } from "lucide-react";
import Avatar from "./Avatar";
import type { blog } from "./BlogCard";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FullBlog({ heading, content, time, name, image, authorId, postId }: blog) {
    const date = new Date(time);
    const [deleteEligible, setDeleteEligible] = useState(false);
    const navigate = useNavigate()
    const formatted = date.toLocaleDateString('en-US', {
        month: 'short',   // 'Dec'
        day: 'numeric',   // 3
        year: 'numeric'   // 2025
    });

    const words = content.trim().split(/\s+/);
    const minutes = Math.round(words.length / 100)

    useEffect(() => {
        const userId = sessionStorage.getItem("userId")

        if (authorId == userId) {
            setDeleteEligible(true);
        }
    }, [])

    const deletePost = (id : string) =>{
        axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,  // Example: JWT Token from localStorage
                
            }
        })
            .then(
                response => {
                    navigate("/blogs");
                    toast.success(response.data.message, {
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
            )
    
    }



    return (
        <div className="" >
            <Heading customClassname="mb-1 text-3xl md:text-4xl 2xl:text-3xl font-extrabold" label={heading} />
            <div className="flex justify-between border-y my-4 py-2 ">
                <div className="flex flex-wrap space-x-2 space-y-1 items-center   ">
                    <Avatar fullName={name} />
                    <div className="text-gray-600 ">{name.toLocaleUpperCase()}</div>
                    <span className="flex w-1 h-1 me-3  rounded-full bg-gray-400"></span>
                    <div className="text-gray-400 font-light">{formatted}</div>
                    <span className="flex items-center px-2 max-w-fit h-6 text-gray-400 text-xs lg:text-sm rounded-xl bg-slate-100">
                        {minutes} min read
                    </span>
                </div>
                <div onClick={()=> (deletePost(postId))} className={`${deleteEligible ? `` : `hidden`} text-slate-500`}>
                    <Trash2  />
                </div>
            </div>

            <div className="flex justify-center items-center">
                <img className="h-3/4 w-3/4" src={image} alt="image description" />
            </div>
            <div className="my-4 prose prose-sm md:prose-base lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }}>

            </div>
        </div>
    )
}
