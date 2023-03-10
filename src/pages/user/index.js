import { useContext, useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card, CardHeader, CardBody, Collapse, Pagination, PaginationItem, PaginationLink, Input, Row, Col, Label, FormFeedback } from "reactstrap";
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

export function UserForm({ service, action }){

    const [profileOptions, setProfileOptions] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id  } = useParams();

    const onSubmit = (e) => {

        e.preventDefault();

        let body = {};

        for(const [key, val] of (new FormData(e.target)).entries()){

            body[key] = val;
        }

        const callback = (res) => {

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

                // Flash message
                navigate('/user');  
            }
        };

        if(id){

            service.update(body, id, callback);
        }
        else {

            service.store(body,  callback);
        }
    };

    const onCancel = (e) => {

        e.preventDefault();

        navigate('/user');  
    }

    useEffect(() => {

        if(service){

            if(id){

                service.edit(id, (res) => {
                    // @todo: Helper JSON unpackage
                    if(res.error){
        
                        alert(res.message);
                    }
                    else {
        
                        setProfileOptions(res.form.profiles);
                        setData(res.data);
                    }
                });
                
            }
            else {

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
        }

    }, [id, service]);

    return(

        <Card>
            <CardBody>
                <Col sm={8}>
                    <Form onSubmit={onSubmit}>
                        <FormGroup row>
                            <Label sm={2}>E-mail</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" invalid={ fieldErrors['email'] ? true : false } placeholder="user@domain.com" defaultValue={ data['email'] || "" }  />
                                <FormFeedback>{fieldErrors['email'] || ""}</FormFeedback>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" invalid={ fieldErrors['name'] ? true : false } defaultValue={ data['name'] || "" } />
                                <FormFeedback>{fieldErrors['name'] || ""}</FormFeedback>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Profile</Label>
                            <Col sm={10}>
                                <Input type="select" name="profile_id" invalid={ fieldErrors['profile_id'] ? true : false } >
                                    <option value="">Select</option>
                                    { profileOptions.map(option => {
        
                                        return <option selected={Number(data['profile_id']) === Number(option.id)} key={`profileOption${option.id}`} value={option.id}>{option.name}</option>
                                    })}  
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
    const [filter, setFilter] = useState({});
    const [selected, setSelected] = useState(0);
    const [pages, setPages] = useState(0);
    const navigate = useNavigate();

    const onCreate = () => {

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
    const onDelete = () => {

        if(selected > 0){

            if(window.confirm('Are you sure ?')){

                service.delete(selected, (res) => {

                    if(res.error){

                        alert('ERROR ' + res.message);
                    }
                    else {

                        setFilter({});
                    }

                });
            }
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
    const onFilter = (e) => {

        e.preventDefault();

        let data = {};

        for(const [key, val] of (new FormData(e.target)).entries()){

            data['[field][' + key + ']'] = val;
        }

        setFilter(data);
    };

    const onReset = (e) => {

        e.preventDefault();
        //e.target.reset();

        setFilter({});
    };

    const onPaginate = (page) => {

        setFilter(current => {  return { ...current, offset: ( page * 10 ), limit: 10 } });
    };
    
    useEffect(()=> {

        service.paginate(filter, (res) => {

            if(res.error){
                alert(res.message);
            }
            else {

                setPages(Math.ceil(res.count / 10));
                setRows(res.rows);
            }
        });

    }, [filter]);
    
    return (
        <>
            <Card className="mb-3">
                <CardHeader>
                    Filter
                </CardHeader>
                <Collapse isOpen={true}>
                    <CardBody>
                        <Form onSubmit={onFilter}>
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
                            <Row>
                                <Col>
                                    <Button color="primary">Search</Button>
                                    {" "}
                                    <Button color="secondary" onClick={onReset}>Reset</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
            <Card>
                <CardHeader>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button color="secondary" onClick={onShow}>Show</Button>
                        <Button color="success" onClick={onCreate}>Add</Button>
                        <Button color="primary" onClick={onEdit}>Edit</Button>
                        <Button color="danger" onClick={onDelete}>Remove</Button>
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
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink first href="#" onClick={e => onPaginate(1)} />
                                        </PaginationItem>
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink  href="#" previous/>
                                        </PaginationItem>
                                            {[...Array(pages).keys()].map(index => <PaginationItem>
                                                    <PaginationLink href="#" onClick={e => onPaginate(index + 1)}>{index + 1}</PaginationLink>
                                                </PaginationItem>
                                            )}
                                        <PaginationItem  disabled={ pages === 1 }>
                                            <PaginationLink href="#" next />
                                        </PaginationItem>
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink href="#" last onClick={e => onPaginate(pages)} />
                                        </PaginationItem>
                                    </Pagination>
                                </Col>
                            </Row>
                        </tfoot>
                    </Table>
                </CardBody>
            </Card>
        </>
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

        service.show(id, (res) => {
            
            if(res.error){

                
            }
            else {

                setData(res.data);
            }
        });

    }, [id, service]);

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