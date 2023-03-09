import { Navigate } from "react-router-dom";

/**
 * Bugfix for react-router-dom >= 6 https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f 
 */
export const AuthorizatedRoute = ({ children, redirectTo }) => {
    
    return true ? children : <Navigate to={redirectTo || '/login'} />;
}