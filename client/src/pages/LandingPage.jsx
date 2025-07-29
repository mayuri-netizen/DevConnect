import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page-wrapper">
            <div className="logo-animation">
                <div className="logo-shape logo-shape1"></div>
                <div className="logo-shape logo-shape2"></div>
            </div>
            <h1 className="landing-title">DevConnect</h1>
            <p className="landing-subtitle">
                The ultimate platform for developers to showcase their projects, share their passion, and receive valuable feedback from a vibrant community of peers.
            </p>
            <Link to="/feed" className="btn">Explore Projects</Link>
        </div>
    );
};

export default LandingPage;