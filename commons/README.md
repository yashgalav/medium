## How to create common module publish on npmjs.com

1. Create folder `mkdir folder cd folder`
2. Run `npm init -y` to get bootstrap it will generate the `package.json` file.
3. Run `tsc --init` it will create the `tsconfig.json` file.
4. Goto `tsconfig.json` file  and set `rootdir = "src"`, `outdir ="dist" ` and `declaration = true`.
5. Goto `package.json` file and change the name to `your_npmjs_username/module_name` and change the `main` path to `src/index.js`.
6. Create `index.ts` inside `src` folder.
7. create `.npmignore` file and `src`


## To Publish
1. Run `cd folder`
2. Run `npm login` in the terminal
3. Enter username and password to login.
4. Run `npm publish --access=public`
5. Done Happy coding!!