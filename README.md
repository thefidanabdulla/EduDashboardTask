Hello There!
There are 2 project in this repository. Backend (Node js) and Frontend (React, TS). 
You must run two project at the same time for see the main project.

For run backend:
1. Enter the backend folder:
  cd backend
2. Install all packages:
  npm install
3. Add .env file. This file must be contains these values:
   
   PORT=3000
   
   MONGO_URI= //Add your mongo db url
   
   JWT_SECRET= //Add jwt secret key
   
   FRONEND_URL=http://localhost:5173/
   
5. Run project:
  npm run dev

For run frontend:
1. Enter frontend folder:
  cd frontend
2. Install all packages:
  npm install
3. Run the project: 
  npm run dev
