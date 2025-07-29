import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const onLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/'); // This will now correctly redirect to the landing page
    }

    const authLinks = (
        <>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/create-project">New Project</Link></li>
            <li className="user-menu" ref={dropdownRef}>
                <button className="user-menu-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Welcome, {user?.name}
                </button>
                {dropdownOpen && (
                    <ul className="user-menu-dropdown">
                        <li><Link to="/my-projects" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Projects</Link></li>
                        <li><div className="dropdown-item" onClick={onLogout}>Logout</div></li>
                    </ul>
                )}
            </li>
            <li><ThemeToggle /></li>
        </>
    );

    const guestLinks = (
        <>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/auth">Sign In</Link></li>
            <li><ThemeToggle /></li>
        </>
    );

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1><Link to="/">DevConnect</Link></h1>
                </div>
                <nav>
                    <ul className="navbar-links">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;