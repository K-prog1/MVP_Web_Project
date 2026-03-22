import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '../../LoadingScreen';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const[isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
   
    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};