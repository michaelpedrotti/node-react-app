import { Outlet, useParams } from "react-router-dom";
import Viewport from '../layout/viewport';

export function PermissionLayout() {
    
    return (
        <Viewport breadcrumbs={[['Admin'], ['Permission']]}>
            <Outlet />
        </Viewport>
    );
}

export function PermissionIndex(){

    return (

        <div>Permission.Index</div>
    );
}

export function PermissionShow(){

    const params = useParams();

    return (

        <div>Show {params.id}</div>
    );
}

export function PermissionEdit(){

    const params = useParams();

    return (

        <div>Edit {params.id}</div>
    );
}

export function PermissionNew(){

    return (

        <div>New</div>
    );
}