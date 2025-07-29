DevConnect - A Full-Stack Developer Showcase
DevConnect is a full-stack web application designed for developers to create profiles, showcase their personal projects, and receive feedback from a community of peers.

Live Application: https://dev-connect-git-main-mayuri-khadses-projects.vercel.app/

Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Project Showcase: Authenticated users can create, update, and delete their projects.

Personalized Feeds: A "My Projects" page for users to view their own submissions.

Community Feedback: Users can view all projects in a central feed and leave comments.

Live Search: A real-time search bar to filter projects on the main feed.

Theming: A sleek, modern UI with a functional Dark/Light mode toggle.

Responsive Design: A clean and intuitive user interface that works on all devices.

Tech Stack
Frontend: React (with Vite), React Router, Plain CSS

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JSON Web Tokens (JWT)

Deployment:

Frontend hosted on Vercel.

Backend hosted on Render.

Getting Started
To run this application locally, you will need to set up both the backend server and the frontend client.

Prerequisites
Node.js (v18.x or later)

npm (or yarn)

MongoDB Atlas account (for the database)

Backend Setup (/server)
Navigate to the server directory:

cd server

Install dependencies:

npm install

Create a .env file:
In the /server directory, create a new file named .env and add the following environment variables.

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_long_random_jwt_secret_key>
PORT=5000

Get your MONGO_URI from your MongoDB Atlas cluster.

Create a long, random string for your JWT_SECRET.

Run the server:

node server.js

The backend API will be running at http://localhost:5000.

Frontend Setup (/client)
Open a new terminal window.

Navigate to the client directory:

cd client

Install dependencies:

npm install

Run the React development server:

npm run dev

The frontend will be available at http://localhost:5173 and is configured to communicate with your local backend server.

Deployment
This application is deployed using a split-deployment strategy on free-tier services.

The backend is deployed as a "Web Service" on Render. The Root Directory is set to server, and the necessary environment variables (MONGO_URI, JWT_SECRET) are configured in the Render dashboard.

The frontend is deployed on Vercel. The Root Directory is set to client. An environment variable named VITE_API_BASE_URL is configured in the Vercel dashboard with the URL of the live Render backend.

Continuous Deployment is enabled. Any git push to the main branch will automatically trigger new deployments on both Render and Vercel.