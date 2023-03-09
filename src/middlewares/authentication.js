import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/session";

export const isAuthenticated = () => true;

/**
 * Bugfix for react-router-dom >= 6 https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f 
 */
export const AuthenticatedRoute = ({ children, redirectTo }) => {
    
    const [ session ] = useContext(SessionContext);

    return session ? children : <Navigate to={redirectTo} />;
}