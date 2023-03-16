import { useContext, useState } from "react";
import { Input, Row, Col, Label, FormFeedback, FormGroup } from "reactstrap";
import UserService from '../../services/user';
import { SessionContext } from "../../contexts/session";
import { AbstractCrudForm, AbstractCrudIndex, AbstractCrudLayout, AbstractCrudShow } from "../abstractCrud";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function UserLayout() {
    
    return <AbstractCrudLayout breadcrumbs={[['Admin'], ['User']]} />;
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function UserIndex(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const columns = {
        'id': '#', 
        'email': 'E-mail',
        'name': 'Name'
    };

    return <AbstractCrudIndex service={service} baseRoute="/user" columns={columns}>
        <Row>
            <Col md={6}>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="text" name="email" />
                </FormGroup>
            </Col>
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
export function UserShow(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const state = useState({});
    const [ data ] = state;

    return  <AbstractCrudShow service={service} state={state} baseRoute="/user">
        <FormGroup row>
            <Label sm={2}>E-mail</Label>
            <Col sm={10}>{ data['email'] || "" }</Col> 
        </FormGroup>
        <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>{ data['name'] || "" }</Col> 
        </FormGroup>
        <FormGroup row>
            <Label sm={2}>Profile</Label>
            <Col sm={10}>{ data?.profile?.name || "" }</Col> 
        </FormGroup>
    </AbstractCrudShow>;
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function UserForm(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const jsonState = useState({
        error: false,
        data: {},
        fields: {},
        form: {} 
    });

    const [json] = jsonState;

    return <AbstractCrudForm service={service} jsonState={jsonState} baseRoute="/user">
        <FormGroup row>
            <Label sm={2}>E-mail</Label>
            <Col sm={10}>
                <Input type="email" name="email" invalid={ json.fields['email'] ? true : false } placeholder="user@domain.com" defaultValue={ json.data['email'] || "" }  />
                <FormFeedback>{json.fields['email'] || ""}</FormFeedback>
            </Col> 
        </FormGroup>
        <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>
                <Input type="text" name="name" invalid={ json.fields['name'] ? true : false } defaultValue={ json.data['name'] || "" } />
                <FormFeedback>{json.fields['name'] || ""}</FormFeedback>
            </Col> 
        </FormGroup>
        <FormGroup row>
            <Label sm={2}>Profile</Label>
            <Col sm={10}>
                <Input type="select" name="profile_id" invalid={ json.fields['profile_id'] ? true : false } >
                    <option value="">Select</option>
                    { json.form['profiles'] && json.form['profiles'].map(option => {

                        return <option selected={Number(json.data['profile_id']) === Number(option.id)} key={`profileOption${option.id}`} value={option.id}>{option.name}</option>
                    })}  
                </Input>
                <FormFeedback>{json.fields['profile_id'] || ""}</FormFeedback>
            </Col> 
        </FormGroup>
    </AbstractCrudForm>;
}