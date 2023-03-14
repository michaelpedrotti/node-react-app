import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SessionContext } from "../../contexts/session";
import Viewport from '../layout/viewport';

export function HomeLayout() {
    
    return (
        <Viewport breadcrumbs={[['Home']]}>
            <Outlet />
        </Viewport>
    );
}

export function HomeIndex() {
    
    const [ session ] = useContext(SessionContext);

    return (

        <div>Home, {session.name}</div>
    );
}