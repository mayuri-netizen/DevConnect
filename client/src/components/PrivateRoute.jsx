import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>; // Or a spinner component
    }

    if (!isAuthenticated) {
        // Declaratively redirect to the auth page if not authenticated.
        // This is more robust than using the navigate() hook inside a useEffect.
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default PrivateRoute;