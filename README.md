# DevConnect - A Full-Stack Developer Showcase

DevConnect is a full-stack web application designed for developers to create profiles, showcase their personal projects, and receive feedback from a community of peers. It features a modern, responsive UI with a full authentication system and a live-filterable project feed.

**Live Application:** https://dev-connect-self.vercel.app/

<img width="1326" height="828" alt="image" src="https://github.com/user-attachments/assets/d8693799-cca4-4d85-8563-bfc156dff13c" />

---

## Features

-   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
-   **Project Showcase**: Authenticated users can create, update, and delete their projects.
-   **Personalized Feeds**: A "My Projects" page for users to view and manage their own submissions.
-   **Community Feedback**: Users can view all projects in a central feed and leave comments on project detail pages.
-   **Live Search**: A real-time search bar to filter projects on the main feed by title.
-   **Theming**: A sleek, modern UI with a functional Dark/Light mode toggle that persists across sessions.
-   **Responsive Design**: A clean and intuitive user interface that works seamlessly on all devices, from mobile to desktop.
-   **Unified Auth UI**: A single, intuitive page for both Login and Registration with a toggle switch.
-   **Landing Page**: A dedicated, animated landing page to introduce the application to new users.

---

## Tech Stack

-   **Frontend**: React (with Vite), React Router, Plain CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JSON Web Tokens (JWT)
-   **Deployment**:
    -   Frontend hosted on **Vercel**.
    -   Backend hosted on **Render**.

---

## Getting Started

To run this application locally, you will need to set up both the backend server and the frontend client.

### Prerequisites

-   Node.js (v18.x or later)
-   npm (or yarn)
-   MongoDB Atlas account (for the database)

### Backend Setup (`/server`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the `/server` directory, create a new file named `.env` and add the following environment variables.

    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_long_random_jwt_secret_key>
    PORT=5000
    ```
    -   Get your `MONGO_URI` from your MongoDB Atlas cluster.
    -   Create a long, random string for your `JWT_SECRET`.

4.  **Run the server:**
    ```bash
    node server.js
    ```
    The backend API will be running at `http://localhost:5000`.

### Frontend Setup (`/client`)

1.  **Open a new terminal window.**

2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the React development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` and is configured to communicate with your local backend server.

---

## Deployment

This application is deployed using a split-deployment strategy on free-tier services.

-   The **backend** is deployed as a "Web Service" on **Render**. The `Root Directory` is set to `server`, and the necessary environment variables (`MONGO_URI`, `JWT_SECRET`) are configured in the Render dashboard.

-   The **frontend** is deployed on **Vercel**. The `Root Directory` is set to `client`. An environment variable named `VITE_API_BASE_URL` is configured in the Vercel dashboard with the URL of the live Render backend. A `vercel.json` file in the root of the project handles rewrites for client-side routing.

-   **Continuous Deployment** is enabled. Any `git push` to the `main` branch will automatically trigger new deployments on both Render and Vercel.
