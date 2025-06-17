import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "./Loader";

export const RequireAuth = ({ children }) => {
    const { isChecked, user } = useContext(AuthContext);
    const location = useLocation();

    if (!isChecked) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children || <Outlet />
}