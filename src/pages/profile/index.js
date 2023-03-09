import { Outlet, useParams } from "react-router-dom";
import Viewport from '../layout/viewport';

export function ProfileLayout() {
    
    return (
        <Viewport breadcrumbs={[['Admin'], ['Profile']]}>
            <Outlet />
        </Viewport>
    );
}

export function ProfileIndex(){

    return (

        <div>Profile.Index</div>
    );
}

export function ProfileShow(){

    const params = useParams();

    return (

        <div>Show {params.id}</div>
    );
}

export function ProfileEdit(){

    const params = useParams();

    return (

        <div>Edit {params.id}</div>
    );
}

export function ProfileNew(){

    return (

        <div>New</div>
    );
}