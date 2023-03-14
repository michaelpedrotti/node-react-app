import { useContext, useState } from "react";
import { Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import PermissionService from "../../services/permission";
import { AbstractCrudForm, AbstractCrudIndex, AbstractCrudLayout, AbstractCrudShow } from "../abstractCrud";

export function PermissionLayout() {
    
    return <AbstractCrudLayout />;
}

export function PermissionIndex(){

    const [ session ] = useContext(SessionContext);
    const service = PermissionService.newInstance(session.token);
    const columns = {
        'id': '#', 
        'resource': 'Name'
    };

    return <AbstractCrudIndex service={service} baseRoute="/profile" columns={columns}>
        <Row>
            <Col md={6}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" />
                </FormGroup>
            </Col>
        </Row>
    </AbstractCrudIndex>;
}

export function PermissionShow(){

    const [ session ] = useContext(SessionContext);
    const service = PermissionService.newInstance(session.token);
    const state = useState({});
    const [ data ] = state;

    return  <AbstractCrudShow service={service} state={state} baseRoute="/profile">
        <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>{ data.name || ""}</Col> 
        </FormGroup> 
    </AbstractCrudShow>;
}

export function PermissionForm(){

    const [ session ] = useContext(SessionContext);
    const service = PermissionService.newInstance(session.token);
    const stateData = useState({});
    const stateError = useState({});
    const [data] = stateData;
    const [error] = stateError;

    return <AbstractCrudForm service={service} stateData={stateData} stateError={stateError} baseRoute="/profile">
        <FormGroup row>
            <Label sm={3}>Name</Label>
            <Col sm={9}>
                <Input type="text" name="name" invalid={ error['name'] ? true : false } defaultValue={ data['name'] || "" } />
                <FormFeedback>{ error['name'] || "" }</FormFeedback>
            </Col> 
        </FormGroup>
    </AbstractCrudForm>;
}