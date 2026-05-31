import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext";

const Role = ({ roles }) => {
    const { user } = useContext(AuthContext);
    console.log({
        user,
        roles,
        condition: roles.includes(user.role),
    })
    if (!roles.includes(user.role))
        // return <Navigate to="/unauthorized" replace />;
        return <Navigate to="/" replace />;

    return <Outlet />;
}

export default Role