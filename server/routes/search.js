const express = require('express');
const router = express.Router();
const { searchContent } = require('../controllers/searchController');

// Route to handle search
router.get('/', searchContent);

module.exports = router;