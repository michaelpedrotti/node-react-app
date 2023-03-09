import { useContext, useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card, CardHeader, CardBody, Pagination, PaginationItem, PaginationLink, Input, Row, Col } from "reactstrap";
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

export function UserIndex() {

    const [ session ] = useContext(SessionContext);
    const service = UserService.newInstance(session.token);
    const [rows, setRows] = useState([]);
    const [filter] = useState({});// eslint-disable-next-line
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
    
    useEffect(()=> {

        service.paginate((res) => {

            if(res.error){
                alert(res.message);
            }
            else {
                setRows(res.rows);
            }
        });

    }, [filter]);
    
    return (

        <Card  className="my-2">
            <CardHeader>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
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
                        { rows.map(row => <tr>
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