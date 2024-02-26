# Node.js

Exploring a few Node.js api

## Installation Guide

1. Install Node.js
2. `npm init`
3. `npm install express --save`
4. `npm install nodemon eslint typescript @types/node ts-node --save-dev`
5. Configure eslint `npx eslint --init`
6. Configure TypeScript `npx tsc --init`
7. Configure `rootDir` and `outDir` in `tsconfig.json`

   ```text
        "rootDir": "./src",
        "outDir": "./dist",       
   ```

8. Configure nodemon for TS support by creating `nodemon.json`

    ```json
    {
        "watch": ["src"],
        "ext": "ts",
        "exec": "ts-node ./src/index.ts"
    }
    ```

9. Add the following scripts in `package.json`

    ```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
    },
    ```

10. Create a file named `index.ts`

11. Run with `npm run dev`
