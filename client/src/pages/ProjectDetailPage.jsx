import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import './ProjectDetailPage.css'; // Import the new CSS

const ProjectDetailPage = () => {
    const { id: projectId } = useParams();
    const [project, setProject] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    const fetchProject = useCallback(async () => {
        try {
            const data = await api.getProject(projectId);
            setProject(data);
        } catch (error) {
            console.error("Failed to fetch project", error);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        try {
            const newComment = await api.addComment(projectId, { text: commentText });
            setProject(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
            setCommentText('');
        } catch (error) {
            console.error("Failed to add comment", error);
            alert('Failed to post comment.');
        }
    };

    if (loading) return <p>Loading project details...</p>;
    if (!project) return <p>Project not found. <Link to="/">Go back</Link></p>;

    return (
        <div className="card">
            <h2>{project.title}</h2>
            <p className="project-author">By {project.author.name}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
                {project.projectLink && <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="btn">GitHub Repo</a>}
                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn">Live Demo</a>}
            </div>
            <hr className="divider" />
            <h3>Feedback & Comments</h3>
            <div>
                {project.comments && project.comments.map(comment => (
                    <div key={comment._id} className="card comment-card">
                        <p>{comment.text}</p>
                        <small>by {comment.author.name} on {new Date(comment.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
                {project.comments && project.comments.length === 0 && <p>No comments yet.</p>}
            </div>
            {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="form-group">
                        <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Leave your feedback..."
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn">Post Comment</button>
                </form>
            ) : (
                <p className="login-prompt"><Link to="/auth">Log in</Link> to leave a comment.</p>
            )}
        </div>
    );
};

export default ProjectDetailPage;