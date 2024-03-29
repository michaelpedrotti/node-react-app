import { useContext, useState } from "react";
import { Table, Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import ProfileService from "../../services/profile";
import { AbstractCrudForm, AbstractCrudIndex, AbstractCrudLayout, AbstractCrudShow } from "../abstractCrud";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function ProfileLayout() {
    
    return <AbstractCrudLayout breadcrumbs={[['Admin'], ['Profile']]} />;
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
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

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
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

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function ProfileForm(){

    const [ session ] = useContext(SessionContext);
    const service = ProfileService.newInstance(session.token);
    const jsonState = useState({
        error: false,
        data: {},
        fields: {},
        form: {} 
    });

    const [json] = jsonState;

    return <AbstractCrudForm service={service} jsonState={jsonState} baseRoute="/profile">
        <FormGroup row>
            <Label sm={3}>Name</Label>
            <Col sm={9}>
                <Input type="text" name="name" invalid={ json.fields['name'] ? true : false } defaultValue={ json.data['name'] || "" } />
                <FormFeedback>{ json.fields['name'] || "" }</FormFeedback>
            </Col> 
        </FormGroup>
        <PermissionFormGroup jsonState={jsonState} />
    </AbstractCrudForm>;
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
const PermissionFormGroup = ({jsonState}) => {

    const [json] = jsonState;
    const resources = json?.form?.resources || [];
    const actions = Object(json?.form?.actions);
    const rows = json?.data?.permissions || [];
    
    return (
        <FormGroup row>
            <Col sm={12}>
                <h4>Permissions</h4>
            </Col>
            <Col sm={12}>
                <Table>
                    <thead>
                        <tr>
                            <th>Resource</th>
                            {Object.keys(actions).map(key => <th key={`tableTrTh${key}`} style={{'textAlign':'center'}}>{key}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        { resources.map((resource, index) =>  <tr>
                                <td>{ resource }</td>
                                    {Object.values(actions).map(action => <td key={`tableTrTd${action}`} style={{'textAlign':'center'}}>
                                    <Input 
                                        type="checkbox" 
                                        name={`permissions[${resource}]`}
                                        defaultChecked={rows.some(row => row.resource == resource && row.actions.includes(action))} 
                                        defaultValue={action}
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