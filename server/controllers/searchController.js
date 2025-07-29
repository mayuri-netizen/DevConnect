const User = require('../models/User');
const Project = require('../models/Project');

// @desc    Search for users or projects
exports.searchContent = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }

        const userQuery = { name: { $regex: query, $options: 'i' } };
        const projectQuery = { title: { $regex: query, $options: 'i' } };

        const users = await User.find(userQuery).select('-password');
        const projects = await Project.find(projectQuery).populate('author', ['name']);

        res.json({ users, projects });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};