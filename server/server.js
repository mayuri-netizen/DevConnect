const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORS Configuration ---
// This explicitly tells your backend which frontend URLs are allowed to make requests.
const allowedOrigins = [
    'http://localhost:5173', // For local development
    'https://dev-connect-git-main-mayuri-khadses-projects.vercel.app' // Your deployed frontend URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
        }
    },
    // This is important for preflight requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true
};

// Use CORS middleware for all routes
app.use(cors(corsOptions));

// --- End of CORS Configuration ---


// Middleware to handle other requests
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
