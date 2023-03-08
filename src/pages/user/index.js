import { Outlet, useParams } from "react-router-dom";
import Viewport from '../layout/viewport';

export function UserLayout() {
    
    return (
        <Viewport>
            <Outlet />
        </Viewport>
    );
}

export function UserIndex(){

    return (

        <div>Index</div>
    );
}

export function UserShow(){

    const params = useParams();

    return (

        <div>Show {params.id}</div>
    );
}

export function UserEdit(){

    const params = useParams();

    return (

        <div>Edit {params.id}</div>
    );
}

export function UserNew(){

    return (

        <div>New</div>
    );
}