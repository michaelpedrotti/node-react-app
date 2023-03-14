import { useContext, useState } from "react";
import { Table, Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import ProfileService from "../../services/profile";
import { AbstractCrudForm, AbstractCrudIndex, AbstractCrudLayout, AbstractCrudShow } from "../abstractCrud";

export function ProfileLayout() {
    
    return <AbstractCrudLayout />;
}

export function ProfileIndex(){

    const [ session ] = useContext(SessionContext);
    const service = ProfileService.newInstance(session.token);
    const columns = {
        'id': '#', 
        'name': 'Name'
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

export function ProfileShow(){

    const [ session ] = useContext(SessionContext);
    const service = ProfileService.newInstance(session.token);
    const state = useState({});
    const [ data ] = state;

    return  <AbstractCrudShow service={service} state={state} baseRoute="/profile">
        <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>{ data.name || ""}</Col> 
        </FormGroup>
        <PermissionFormGroup />
    </AbstractCrudShow>;
}

const PermissionFormGroup = () => {

    const actions = {
        'create': 'C',
        'read': 'R',
        'update': 'U',
        'delete': 'D'
    };
    const rows = [
        {id: 1, resource: "user", actions: ["R"]},
        {id: 2, resource: "profile", actions: ["R"]},
        {id: 3, resource: "permission", actions: ["R"]},
    ];

    return (
        <FormGroup row>
            <Col sm={12}><h4>Permissions</h4></Col>
            <Col sm={12}>
                <Table>
                    <thead>
                        <tr>
                            <th>Resource</th>
                            {Object.keys(actions).map(key => <th key={`tableTrTh${key}`} style={{'textAlign':'center'}}>{key}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        { rows.map((row, index) =>  <tr>
                                <td>{ row.resource }</td>
                                    {Object.values(actions).map(val => <td key={`tableTrTd${val}`} style={{'textAlign':'center'}}>
                                    <Input 
                                        type="checkbox" 
                                        name={`actions[${index}]`} 
                                        checked={row.actions.includes(val)} 
                                        defaultValue={val}
                                    />
                                </td>)}
                            </tr>    
                        )}
                    </tbody>
                </Table>
            </Col>
        </FormGroup>
    );
}

export function ProfileForm(){

    const [ session ] = useContext(SessionContext);
    const service = ProfileService.newInstance(session.token);
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
        <PermissionFormGroup />
    </AbstractCrudForm>;
}