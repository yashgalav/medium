import { useEffect, useState } from "react"
import axios from "axios";
import type { blogResponseType } from "@yashxdev/commons";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { inputAtom } from "../store/atoms";



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blogResponseType[]>([]);

     const [inputValue, setInputValue] = useRecoilState(inputAtom);
  
  const debouncedValue = useDebounce(inputValue, 500);

//   useEffect(() =>{
    
//   },[debouncedValue])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog?filter=${debouncedValue}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,  // Example: JWT Token from localStorage
                'Content-Type': 'application/json'  // Optional for GET
            }
        })
            .then(
                response => {
                    setBlogs(response.data.data)
                    setLoading(false)
                }
               
            )
    }, [debouncedValue])


    return {
        loading,
        blogs
    }
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blogResponseType>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,  // Example: JWT Token from localStorage
                'Content-Type': 'application/json'  // Optional for GET
            }
        })
            .then(
                response => {
                    setBlog(response.data)
                    setLoading(false)
                }
            )
    }, [id])


    return {
        loading,
        blog
    }
}


export default function useDebounce(inputValue : string, timeout:number) {
    const [ debouncedValue, setDebouncedValue ] = useState(inputValue);

    useEffect(() => {
        let timeOutNumber =setInterval(() =>{
            setDebouncedValue(inputValue);
        }, timeout)
        
        // clearing the old clock for the for we can start new clock and once we 
        // reached at that point where no key was pressed untill 500 ms
        return () => {
            clearInterval(timeOutNumber);
        }

    },[inputValue])

  return debouncedValue
}
