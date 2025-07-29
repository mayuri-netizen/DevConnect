import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './FeedPage.css';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = useMemo(() => {
        if (!searchTerm) {
            return projects;
        }
        return projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [projects, searchTerm]);

    if (loading) return <p>Loading projects...</p>;

    return (
        <div>
            <div className="feed-header">
                <h1>Project Feed</h1>
                <p>Explore projects shared by the community</p>
            </div>

            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search projects by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredProjects.length > 0 ? (
                filteredProjects.map(p => <ProjectCard key={p._id} project={p} />)
            ) : (
                <p>No projects found. Try a different search or be the first to post!</p>
            )}
        </div>
    );
};

export default HomePage;