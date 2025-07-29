import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './AuthPage.css';

const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // State for both forms
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

    const handleLoginChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(loginData.email, loginData.password);
            navigate('/feed');
        } catch (err) {
            setError(err.msg || 'Login failed.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(registerData.name, registerData.email, registerData.password);
            navigate('/feed');
        } catch (err) {
            setError(err.msg || 'Registration failed.');
        }
    };

    const LoginForm = (
        <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />
            </div>
            <button type="submit" className="btn">Sign In</button>
        </form>
    );

    const RegisterForm = (
        <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
                <label htmlFor="register-name">Full Name</label>
                <input id="register-name" type="text" name="name" value={registerData.name} onChange={handleRegisterChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" name="email" value={registerData.email} onChange={handleRegisterChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" name="password" value={registerData.password} onChange={handleRegisterChange} required minLength="6" />
            </div>
            <button type="submit" className="btn">Create Account</button>
        </form>
    );

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-toggle">
                    <button onClick={() => setIsLoginView(true)} className={isLoginView ? 'active' : ''}>Sign In</button>
                    <button onClick={() => setIsLoginView(false)} className={!isLoginView ? 'active' : ''}>Sign Up</button>
                </div>

                <div className="auth-header">
                    <h1>{isLoginView ? 'Welcome Back!' : 'Create Account'}</h1>
                </div>

                {error && <div className="alert">{error}</div>}

                {isLoginView ? LoginForm : RegisterForm}
            </div>
        </div>
    );
};

export default AuthPage;