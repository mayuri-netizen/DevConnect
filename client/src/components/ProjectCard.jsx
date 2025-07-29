import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = React.memo(({ project }) => (
    <div className="card">
        <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>By {project.author.name}</p>
        <p>{project.description.substring(0, 150)}...</p>
        <div style={{ marginTop: '1rem' }}>
            <Link to={`/project/${project._id}`} className="btn">
                View & Comment
            </Link>
        </div>
    </div>
));

export default ProjectCard;