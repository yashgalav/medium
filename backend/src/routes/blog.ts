import { Prisma, PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { createBlogInput, updateBlogInput, signupInputType, blogResponseType } from "@yashxdev/commons";
import { encodeBase64 } from "hono/utils/encode";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		CLOUDINARY_CLOUD_NAME: string;
		CLOUDINARY_API_KEY: string;
		CLOUDINARY_API_SECRET: string;
	},
	Variables: {
		userId: string
	}
}>();

// blogRouter.use("*", authMiddleware);

type CloudinaryUploadResponse = {
	public_id: string;
	secure_url: string;
};

// type blogResponse


blogRouter.post('/create', authMiddleware, async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());


	const data: FormData = await c.req.formData();

	console.log(data);

	const rawTitle = data.get('title');
	const rawContent = data.get('content');
	const rawImage = data.get('image');

	if (!rawTitle || !rawContent || !rawImage) {
		return c.json({ message: "Title, Content, and Image are required!" }, 400);
	}

	const title = rawTitle.toString();
	const content = rawContent.toString();
	const image = data.get('image') as File;


	// // Validate input
	// const result = createBlogInput.safeParse({
	// 	title:title,
	// 	content:content,
	// 	image:image,
	// 	authorId:userId
	// });


	// const { success } = createBlogInput.safeParse(result);
	// if (!success) {
	// 	c.status(411)
	// 	return c.json({
	// 		message: "Input not correct!"
	// 	})
	// }



	// coverting image into base64 and upload
	const byteArrayBuffer = await image.arrayBuffer();
	const base64 = encodeBase64(byteArrayBuffer);

	// Construct upload URL
	const timestamp = Math.floor(Date.now() / 1000);
	const paramsToSign = `timestamp=${timestamp}${c.env.CLOUDINARY_API_SECRET}`;
	const signature = await crypto.subtle.digest(
		"SHA-1",
		new TextEncoder().encode(paramsToSign)
	);
	const signatureHex = [...new Uint8Array(signature)]
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	const formData = new FormData();
	formData.append("file", `data:image/png;base64,${base64}`);
	formData.append("api_key", c.env.CLOUDINARY_API_KEY);
	formData.append("timestamp", `${timestamp}`);
	formData.append("signature", signatureHex);
	console.log("here 5")
	const uploadRes = await fetch(
		`https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
		{
			method: "POST",
			body: formData,
		}
	);

	const results = await uploadRes.json() as CloudinaryUploadResponse;


	const post = await prisma.post.create({
		data: {
			title: title,
			content: content,
			authorId: userId,
			imageId: results.public_id,
			imageUrl: results.secure_url
		}
	});

	return c.json({
		message: "Posted Succesfully!"
	});
})

blogRouter.put('/update', authMiddleware, async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411)
		return c.json({
			message: "Input not correct!"
		})
	}

	const post = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({
		message: "Post Update",
		post: post
	});
});

blogRouter.get('/:blogId', async (c) => {
	const id = c.req.param('blogId');
	console.log(id)
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const post = await prisma.post.findFirst({
		where: {
			id: id,
		}
	});



	const user = await prisma.user.findUnique({
		where: {
			id: post!.authorId
		}
	})

	const data: blogResponseType = {
		id: post!.id,
		title: post!.title,
		content: post!.content,
		published: post!.published,
		authorId: post!.authorId,
		publishedAt: post!.publishedAt,
		imageId: post!.imageId,
		imageUrl: post!.imageUrl,
		authorName: user!.name ?? "Anonymous"
	}

	return c.json(data);
})

blogRouter.delete('/:blogId', authMiddleware, async (c) => {
	const userId = c.get("userId");
	const blogId = c.req.param('blogId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const cloudName = c.env.CLOUDINARY_CLOUD_NAME;
	const apiKey = c.env.CLOUDINARY_API_KEY;
	const apiSecret = c.env.CLOUDINARY_API_SECRET;
	console.log(apiKey);


	const post = await prisma.post.findUnique({
		where: {
			id: blogId,
			authorId: userId
		}
	});

	const imgId = post?.imageId || "";

	const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;

	const body = new URLSearchParams({
		public_ids: [imgId], // Note: use public_ids array format
		invalidate: 'true',
	});

	const res = await fetch(url, {
		method: 'DELETE',
		body: body,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	await prisma.post.delete({
		where: {
			id: blogId,
			authorId: userId
		}
	});


	return c.json({
		message: "Post deleted successfully!"
	});
});

blogRouter.get('', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const page = parseInt(c.req.query('page') || '1');
	const pageSize = 10;
	const filter = c.req.query('filter') || ''; // ?filter=react

	const posts = await prisma.post.findMany({
		where: {
			OR: [
				{
					title: {
						contains: filter,
						mode: 'insensitive' // case-insensitive search
					}
				},
				{
					content: {
						contains: filter,
						mode: 'insensitive'
					}
				},
				{
					author: {
						name: {
							contains: filter,
							mode: 'insensitive'
						}
					}
				}
			]
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
		orderBy: {
			publishedAt: 'desc' // make sure this field exists
		}
	});


	const userId: string[] = []
	posts.forEach(p => { userId.push(p.authorId) })
	const users = await prisma.user.findMany({
		where: {
			id: { in: userId }
		}
	})
	// Create the map (key: user id, value: user object)
	const userMap: Map<string, User> = new Map();

	users.forEach(user => {
		userMap.set(user.id, user);
	});

	const dataList: blogResponseType[] = []
	posts.forEach(p => {

		const data: blogResponseType = {
			id: p.id,
			title: p.title,
			content: p.content,
			published: p.published,
			authorId: p.authorId,
			publishedAt: p.publishedAt,
			imageId: p.imageId,
			imageUrl: p.imageUrl,
			authorName: userMap.get(p.authorId)!.name ?? "Anonymous"
		};
		dataList.push(data);
	});

	const totalCount = await prisma.post.count({
		where: {
			OR: [
				{
					title: {
						contains: filter,
						mode: 'insensitive'
					}
				},
				{
					content: {
						contains: filter,
						mode: 'insensitive'
					}
				},
				{
					author: {
						name: {
							contains: filter,
							mode: 'insensitive'
						}
					}
				}
			]
		}
	});

	return c.json({
		data: dataList,
		meta: {
			page,
			pageSize,
			totalPages: Math.ceil(totalCount / pageSize),
			totalCount
		}
	});
});
