import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

const RedirectHome = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (isAuthenticated && user.isVerified)
        return <Navigate to="/" replace />;

    return <Outlet />;
}

export default RedirectHome;