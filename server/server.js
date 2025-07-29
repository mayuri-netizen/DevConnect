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
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

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
