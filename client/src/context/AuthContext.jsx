import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = await api.getMe();
                console.log('--- Inside loadUser: User data received:', userData);
                setUser(userData);
                console.log('--- Inside loadUser: setUser has been called.');
            } catch (error) {
                console.error("Failed to load user during loadUser call", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (email, password) => {
        console.log('3. Inside AuthContext: login function started.');
        try {
            const { token } = await api.login({ email, password });
            localStorage.setItem('token', token);
            await loadUser();
            console.log('4. Inside AuthContext: loadUser finished successfully after login.');
        } catch (error) {
            console.error('Error within AuthContext login function:', error);
            throw error; // Re-throw the error so the login page can catch it and display a message
        }
    };

    const register = async (name, email, password) => {
        try {
            const { token } = await api.register({ name, email, password });
            localStorage.setItem('token', token);
            await loadUser();
        } catch (error) {
            console.error('Error within AuthContext register function:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const authContextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);