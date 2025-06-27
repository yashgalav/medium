import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@yashxdev/commons";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message : "Input not correct!"
      })
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
      });
      
      if (existingUser) {
        return c.json({ error: "Email already in use" }, 400);
      }
  
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name : body.name
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token,
      name:user.name,
      userId:user.id  
    })
})

userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedBody = signinInput.safeParse(body);
    
    if(!parsedBody.success){
      c.status(411)
      return c.json({
         message: "Invalid inputs" 
      })
    } 

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ message: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ 
      jwt:jwt,
      name:user.name,
      userId:user.id  
    });
})