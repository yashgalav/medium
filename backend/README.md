```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
## How Hono project was created

1. create project with `npm create hono@latest`

2. Make sure select the correct environment `cloudflare`

3. `npm install`

4. Initialize prisma in your project

    `npm i prisma`
    `npx prisma init`

5. Get the Postgres DB URL from neonDb or aieven.tech

`postgres://avnadmin:password@host/db`
add this url in .env file so that your cli can use this to migrate the schema to DB directly

6. Get connection pool URL from Prisma accelerate

`prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`
put this inside `wrangler.toml` or `wrangler.jsonc` so that your backend can connect with connect pool.

7. Now craete schma inside `schema.prisma` file  and migrate it  to DB
 `npx prisma migrate dev --name init_schema`

8. Generate the prisma client
 `npx prisma generate --no-engine`

9. Add the accelerate extension
 `npm install @prisma/extension-accelerate`

10. If there is problem in client than remove the node module `rm -rf node_modules` once then `npm i` again.


## TO Publis the hono App 
1. `npx wrangler login`
2. `npx wrangler whoami`
3. `npm run deploy`