import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';


const ProtectedRoute = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;
    if (!user.isVerified)
        return <Navigate to="/email-verify" replace />;

    return <Outlet />
}

export default ProtectedRoute;