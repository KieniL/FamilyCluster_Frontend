# frontend

Created with npx create-react-app frontend --template typescript

Create api.ts with content to get api configuration

Create api folder with generate.sh and run it

Added Dockerfile and nginx folder

Added Routing in App.tsx (npm i --save-dev @types/react-router-dom)
If there is any error in the api for babel just add declare to export namespace --> export declare namespace TokenVerifiyResponse


On local development export this: export REACT_APP_API_URL=https://frontend.kieni.at/api

In k8s there is no variable setting since it used from the relative path /api