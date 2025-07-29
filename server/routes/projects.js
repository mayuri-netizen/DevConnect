const express = require('express');
const router = express.Router();
const {
    createProject,
    getAllProjects,
    getProjectById,
    addCommentToProject,
    getProjectsByUser
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllProjects);
router.get('/myprojects', authMiddleware, getProjectsByUser); // New route
router.get('/:id', getProjectById);
router.post('/', authMiddleware, createProject);
router.post('/:id/comments', authMiddleware, addCommentToProject);

module.exports = router;
