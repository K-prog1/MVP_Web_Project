import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '../../LoadingScreen';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Для MVP проверяем только наличие токена
        // В реальном приложении нужно проверять на сервере
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};