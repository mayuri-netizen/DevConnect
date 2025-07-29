const Project = require('../models/Project');
const Comment = require('../models/Comment');

// @desc    Create a new project
exports.createProject = async (req, res) => {
    const { title, description, projectLink, liveLink } = req.body;
    try {
        const newProject = new Project({
            title,
            description,
            projectLink,
            liveLink,
            author: req.user.id,
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('author', ['name']).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get project by ID with comments
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('author', ['name'])
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'name' }
            });
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Comment on a project
exports.addCommentToProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const newComment = new Comment({
            text: req.body.text,
            author: req.user.id,
            project: req.params.id,
        });
        const comment = await newComment.save();
        project.comments.push(comment.id);
        await project.save();

        const populatedComment = await Comment.findById(comment.id).populate('author', ['name']);
        res.json(populatedComment);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all projects for the logged-in user
exports.getProjectsByUser = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};