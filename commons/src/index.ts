import { z } from "zod";

// signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export type signupInputType = z.infer<typeof signupInput>

// signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type signinInputType = z.infer<typeof signinInput>

//create blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
    image: z.instanceof(File, { message: "Image file is required" }),
})

export type createBlogInputType = z.infer<typeof createBlogInput>


//update blog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
    id: z.string(),
})

export type updateBlogInputType = z.infer<typeof updateBlogInput>


export const blogResponse = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    authorId: z.string(),
    publishedAt: z.date(),
    imageId: z.string(),
    imageUrl: z.string(),
    authorName: z.string()
})

export type blogResponseType = z.infer<typeof blogResponse>