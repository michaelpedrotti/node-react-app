import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/session";
import { ErrorContext } from "../contexts/error";

export const isAuthenticated = () => true;

/**
 * Bugfix for react-router-dom >= 6 https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f 
 */
export const AuthenticatedRoute = ({ children, redirectTo }) => {
    
    const [ session ] = useContext(SessionContext);
    const [, setError ] = useContext(ErrorContext);

    if(session) {

        return children;
    }
    else {

        setError({level:'danger', message: 'None Auth'});

        return <Navigate to={redirectTo || '/login'} />;
    }
}