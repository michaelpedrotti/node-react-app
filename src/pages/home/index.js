import { useContext } from "react";
import { SessionContext } from "../../contexts/session";

export function HomeIndex(props) {
    
    const [ session ] = useContext(SessionContext);
    console.log('value', session);
    return (

        <div>Home, {session.name}</div>
    );

}