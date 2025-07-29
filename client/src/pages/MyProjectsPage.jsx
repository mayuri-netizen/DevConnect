import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';

const MyProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const data = await api.getMyProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch your projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProjects();
    }, []);

    if (loading) return <p>Loading your projects...</p>;

    return (
        <div>
            <div className="feed-header">
                <h1>My Projects</h1>
                <p>Manage all the projects you've created.</p>
            </div>

            {projects.length > 0 ? (
                projects.map(p => <ProjectCard key={p._id} project={p} />)
            ) : (
                <p>You haven't created any projects yet. <Link to="/create-project">Create one now!</Link></p>
            )}
        </div>
    );
};

export default MyProjectsPage;