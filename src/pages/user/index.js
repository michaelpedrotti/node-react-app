import { useContext, useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card, CardHeader, CardBody, Pagination, PaginationItem, PaginationLink, Input, Row, Col, Label, FormFeedback } from "reactstrap";
import { Form, FormGroup } from "reactstrap";
import Viewport from '../layout/viewport';
import UserService from '../../services/user';
import { SessionContext } from "../../contexts/session";

export function UserLayout() {
    
    return (
        <Viewport breadcrumbs={[['Admin'], ['User']]}>
            <Outlet />
        </Viewport>
    );
}

export function UserForm({ service }){

    const [profileOptions, setProfileOptions] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const onSubmit = (e) => {

        e.preventDefault();

        let body = {};

        for(const [key, val] of (new FormData(e.target)).entries()){

            body[key] = val;
        }

        service.store(body, (res) => {

            
            if(res.error){

                if(res.fields){

                    let errors = {};

                    for(const [field, data] of Object.entries(res.fields)){

                        errors[field] = data.msg;
                    }
                    
                    setFieldErrors(errors);
                }

                alert(res.message || "Error");
            }
            else {

                alert(res.message + "\n" + res.password);

                e.target.reset();
                setFieldErrors({});
            }
        });
    };

    const onCancel = (e) => {

        e.preventDefault();

        navigate('/user');  
    }

    useEffect(() => {

        if(service){

            service.new((res) => {
                // @todo: Helper JSON unpackage
                if(res.error){
    
                    alert(res.message);
                }
                else {
    
                    setProfileOptions(res.form.profiles);
                }
            });
        }

    }, []);

    return(

        <Card>
            <CardBody>
                <Col sm={8}>
                    <Form onSubmit={onSubmit}>
                        <FormGroup row>
                            <Label sm={2}>E-mail</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" invalid={ fieldErrors['email'] ? true : false } placeholder="user@domain.com"  />
                                <FormFeedback>{fieldErrors['email'] || ""}</FormFeedback>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" invalid={ fieldErrors['name'] ? true : false } />
                                <FormFeedback>{fieldErrors['name'] || ""}</FormFeedback>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Profile</Label>
                            <Col sm={10}>
                                <Input type="select" name="profile_id" invalid={ fieldErrors['profile_id'] ? true : false }>
                                    <option value="">Select</option>
                                    { profileOptions.map(option => <option key={`profileOption${option.id}`} value={option.id}>{option.name}</option>) }  
                                </Input>
                                <FormFeedback>{fieldErrors['profile_id'] || ""}</FormFeedback>
                            </Col> 
                        </FormGroup>
                        <Button color="primary">Save</Button>
                        {" "}
                        <Button color="danger" onClick={onCancel}>Cancel</Button>
                    </Form>
                </Col>
            </CardBody>
        </Card>
    );
}

export function UserIndex() {

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const [rows, setRows] = useState([]);
    const [filter] = useState({});
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const onNew = () => {

        navigate('/user/new');        
    };
    const onEdit = () => {

        if(selected > 0){

            navigate('/user/' + selected +  '/edit');  
        }
        else {

            alert("Select one record");  
        } 
    };

    const onShow = () => {

        if(selected > 0){

            navigate('/user/' + selected);  
        }
        else {

            alert("Select one record");  
        } 
    };
    
    useEffect(()=> {

        service.paginate((res) => {

            if(res.error){
                alert(res.message);
            }
            else {
                setRows(res.rows);
            }
        });

    }, [filter]);// eslint-disable-next-line
    
    return (

        <Card  className="my-2">
            <CardHeader>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button color="secundary" onClick={onShow}>Show</Button>
                    <Button color="success" onClick={onNew}>Add</Button>
                    <Button color="primary" onClick={onEdit}>Edit</Button>
                    <Button color="danger" onClick={() => navigate('/user/new')}>Remove</Button>
                </div>
            </CardHeader>
            <CardBody>
                <Table hover>
                    <thead>
                        <tr>
                            <th width="1rem">#</th>
                            <th>E-mail</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows.map(row => <tr key={`row-${row.id}`}>
                                <td width="1rem">
                                    <Input type="radio" name="id" value={row.id} onClick={e => setSelected(Number(e.target.value))} />
                                </td>
                                <td>{row.email}</td>
                                <td>{row.name}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <Row>
                            <Col lg="4">dafasd</Col>
                            <Col lg="8">
                                <Pagination>
                                    <PaginationItem>
                                        <PaginationLink first href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink  href="#" previous/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" next />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" last />
                                    </PaginationItem>
                                </Pagination>
                            </Col>
                        </Row>
                    </tfoot>
                </Table>
            </CardBody>
        </Card>
    );
}

export function UserShow(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const { id = 0 } = useParams();
    const [ data, setData ] = useState({});

    const navigate = useNavigate();

    const onBack = (e) => {
        

        e.preventDefault();

        navigate('/user');  
    };

    useEffect(() => {

        if(service){

            service.show(id, (res) => {
                
                console.log('res', res);

                if(res.error){
    
                    
                }
                else {
    
                    setData(res.data);
                }
            });
        }

    }, []);

    return(

        <Card>
            <CardBody>
                <Col sm={8}>
                    <Form>
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
                         {" "}
                        <Button color="danger" onClick={onBack}>Back</Button>
                    </Form>
                </Col>
            </CardBody>
        </Card>
    );
}

export function UserEdit(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    
    return (

        <UserForm service={service}></UserForm>
    );

}

export function UserNew(){

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    
    return (

        <UserForm service={service}></UserForm>
    );
}