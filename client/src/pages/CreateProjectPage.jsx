import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateProjectPage = () => {
    const [formData, setFormData] = useState({ title: '', description: '', projectLink: '', liveLink: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try {
            await api.createProject(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/my-projects');
            }, 2000);
        } catch (err) {
            setError(err.msg || 'Failed to create project.');
        }
    };

    return (
        <div className="card" style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <h2>Create a New Project</h2>

            {success && (
                <div className="alert" style={{ backgroundColor: '#28a745' }}>Project Created Successfully! Redirecting...</div>
            )}
            {error && <div className="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
                </div>
                <div className="form-group">
                    <label>Project Link (e.g., GitHub Repo)</label>
                    <input type="url" name="projectLink" value={formData.projectLink} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Live Demo Link</label>
                    <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} />
                </div>
                <button type="submit" className="btn" disabled={success}>
                    {success ? 'Submitted!' : 'Submit Project'}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPage;
