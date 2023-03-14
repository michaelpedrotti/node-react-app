import { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Table, Row, Col, Card, CardHeader, CardBody, Collapse, Input, Pagination, PaginationItem, 
    PaginationLink,  Form, Button } from "reactstrap";
import Viewport from '../layout/viewport';


export function AbstractCrudLayout({ breadcrumbs }) {
    
    return (
        <Viewport breadcrumbs={breadcrumbs}>
            <Outlet />
        </Viewport>
    );
}

export function AbstractCrudForm({ service, stateData, stateError, baseRoute = '/user', children }){

    const [, setFieldErrors] = stateError;
    const [, setData] = stateData;
    const navigate = useNavigate();
    const { id  } = useParams();

    const onFormSubmit = (e) => {

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

                navigate(baseRoute);  
            }
        };

        if(id){

            service.update(body, id, callback);
        }
        else {

            service.store(body,  callback);
        }
    };

    const onClickCancel = (e) => {

        e.preventDefault();

        navigate(baseRoute);  
    }

    useEffect(() => {

        if(service){

            if(id){

                service.edit(id, (res) => {

                    if(res.error){
        
                        alert(res.message);
                    }
                    else {
        
                        setData(res.data);
                    }
                });
            }
            else {

                service.new((res) => {

                    if(res.error){
        
                        alert(res.message);
                    }
                    else {
        
                        // setProfileOptions(res.form.profiles);   
                    }
                });
            }
        }

    }, [id, service]);

    return(

        <Card>
            <CardBody>
                <Col sm={8}>
                    <Form onSubmit={onFormSubmit}>
                        {children}
                        <Button color="primary">Save</Button>
                        {" "}
                        <Button color="danger" onClick={onClickCancel}>Cancel</Button>
                    </Form>
                </Col>
            </CardBody>
        </Card>
    );
}

export function AbstractCrudIndex({ service, baseRoute = '/user', children, columns={} }) {

    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState({});
    const [selected, setSelected] = useState(0);
    const [pages, setPages] = useState(0);
    const navigate = useNavigate();

    const onClickCreate = () => {

        navigate(baseRoute + '/new');        
    };
    const onClickEdit = () => {

        if(selected > 0){

            navigate(baseRoute + '/' + selected +  '/edit');  
        }
        else {

            alert("Select one record");  
        } 
    };
    const onClickDelete = () => {

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
    const onClickShow = () => {

        if(selected > 0){

            navigate(baseRoute + '/' + selected);  
        }
        else {

            alert("Select one record");  
        } 
    };
    const onClickFilter = (e) => {

        e.preventDefault();

        let data = {};

        for(const [key, val] of (new FormData(e.target)).entries()){

            data['[field][' + key + ']'] = val;
        }

        setFilter(data);
    };
    const onClickReset = (e) => {

        e.preventDefault();
        //e.target.reset();

        setFilter({});
    };
    const onClickPaginate = (page) => {

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
                {/* @url: https://du4z3.csb.app/ */}
                {/* @url: https://codesandbox.io/s/du4z3 */}
                <Collapse isOpen={true}>
                    <CardBody>
                        <Form onSubmit={onClickFilter}>
                            {children}
                            <Row>
                                <Col>
                                    <Button color="primary">Search</Button>
                                    {" "}
                                    <Button color="secondary" onClick={onClickReset}>Reset</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
            <Card>
                <CardHeader>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button color="secondary" onClick={onClickShow}>Show</Button>
                        <Button color="success" onClick={onClickCreate}>Add</Button>
                        <Button color="primary" onClick={onClickEdit}>Edit</Button>
                        <Button color="danger" onClick={onClickDelete}>Remove</Button>
                    </div>
                </CardHeader>
                <CardBody> 
                    <Table hover>
                        <thead>
                            <tr>
                                { Object.values(columns).map(label => <th >{label}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            { rows.map(row => <tr key={`row-${row.id}`}>
                                { Object.keys(columns).map(key => {
                                    
                                    if(key === 'id'){
                                        return(
                                            <td width="1rem">
                                                <Input type="radio" name="id" value={row.id} onClick={e => setSelected(Number(e.target.value))} />
                                            </td>
                                        );
                                    }
                                    else {

                                        return <td >{ row[key] }</td>
                                    }
                                })}
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <Row>
                                <Col lg="4">dafasd</Col>
                                <Col lg="8">
                                    <Pagination>
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink first href="#" onClick={e => onClickPaginate(1)} />
                                        </PaginationItem>
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink  href="#" previous/>
                                        </PaginationItem>
                                            {[...Array(pages).keys()].map(index => <PaginationItem>
                                                    <PaginationLink href="#" onClick={e => onClickPaginate(index + 1)}>{index + 1}</PaginationLink>
                                                </PaginationItem>
                                            )}
                                        <PaginationItem  disabled={ pages === 1 }>
                                            <PaginationLink href="#" next />
                                        </PaginationItem>
                                        <PaginationItem disabled={ pages === 1 }>
                                            <PaginationLink href="#" last onClick={e => onClickPaginate(pages)} />
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

export function AbstractCrudShow({ service, state, baseRoute = '/user', children }){

    const { id = 0 } = useParams();
    const [ , setData ] = state;

    const navigate = useNavigate();

    const onClickBack = (e) => {
        
        e.preventDefault();

        navigate(baseRoute);  
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
                        {children}
                        {" "}
                        <Button color="danger" onClick={onClickBack}>Back</Button>
                    </Form>
                </Col>
            </CardBody>
        </Card>
    );
}