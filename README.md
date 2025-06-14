# To-Do List API project from Roadmap

This is a simple functional full-stack application that allows users to manage their todo lists.
It includes user authentication, todo creation, updating, and deletion.

## Api Url Endpoints
- POST `/auth/register`
- POST `/auth/login`
- POST `/api/todos`
- PUT `/api/todos/{id}`
- DELETE `/api/todos/{id}`
- GET `api/todos?page=1&limit=10`

## Tech Stack
- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Security**: JWT (JSON Web Tokens), bcrypt
- **Styling**: CSS, Tailwind CSS, react-icons

## Local Setup

**BACKEND**  
Clone the repository, install backend dependencies, update dependencies, and run the backend server:
```bash
git clone https://github.com/Patri22k/ToDoListAPI 
cd backend
npm install
npm update
npm run dev
```
*Note: You should see `Server is running on port ${PORT}` in the terminal.*

**FRONTEND**  
In a new terminal, install and/or update frontend dependencies in the root directory:
```bash
npm install
npm update
npm run dev
```

**MONGODB SERVER**  
Make sure you have a MongoDB server running. Either create a local MongoDB instance
or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/).

To create a local web server, you can use nginx and/or Docker.
Follow these instructions to set up a local Web server:
```bash
docker run -d -p 8080:80 -v $(pwd)/ToDoListAPI:/usr/share/nginx/html:ro --name todo-list-api nginx
```

## Production Build
I have created a production build of the frontend and backend application.
The database is hosted on **MongoDB Atlas**, the frontend is hosted on **Vercel**,
and the backend is hosted on **Render**.  
If you want to see the production build, you can DM me anywhere on my social media accounts;
I have to allow network access.  
*Note: The production build is currently not fully functional.*

## Environment Variables
Create a `.env` file in the backend directory with the following variables:
```plaintext
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=mongodb://localhost:27017/todolist
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the frontend directory with the following variable:
```plaintext
VITE_AUTH_BASE_URL=http://localhost:3000/auth
VITE_API_BASE_URL=http://localhost:3000/api
```