import { Navigate } from "react-router-dom";

export const isAuthenticated = () => true;

/**
 * Bugfix for react-router-dom >= 6 https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f 
 */
export const AuthenticatedRoute = ({ children, redirectTo }) => {
    
    return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}