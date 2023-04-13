import { useContext, useState, useEffect } from "react";
import GithubService from '../../services/github';
import { SessionContext } from "../../contexts/session";
import { AbstractCrudLayout } from "../abstractCrud";
import swal from 'sweetalert';
import { Table, Row, Col, Form, Badge, Card, FormGroup, Label, CardBody, Button, Media, ListGroup, ListGroupItem } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";


/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function GithubLayout() {
    
    return <AbstractCrudLayout breadcrumbs={[['Admin'], ['Github']]} />;
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function GithubIndex(){

    const [ session ] = useContext(SessionContext);
    const service = GithubService.newInstance(session.token);

    const [rows, setRows] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [reload, setReload] = useState(1);
    const [filter, setFilter] = useState({});

    
    useEffect(()=> {

        service.paginate(filter, (res) => {

            if(res.error){
                
                swal("Danger", res.message, "danger");
            }
            else {

                if(res.pages && res.pages.next){

                    let obj = {};

                    for(const [name, value] of new URLSearchParams(res.pages.next).entries()){

                        obj[name] = value;
                    }

                    setFilter(obj);
                    setDisabled(false);
                }
                else {
                   
                    setDisabled(true);
                }

                setRows(current => {

                    return current.concat(res.rows);
                });
            }
        });

    }, [reload]);
    
    return (
        <>
            <Card>
                <CardBody> 
                    <Table hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows.map(row => <tr key={`github-row-${row['id']}`}>
                                    <td>{ row.id }</td>
                                    <td><Link to={`/github/${row.login}`} >{ row.login }</Link></td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <Row>
                                <Col lg="12">
                           
                                    <Button disabled={disabled} onClick={() => { setReload((current) => current + 1);  }}>+ 5</Button>
                                </Col>
                            </Row>
                        </tfoot>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
}

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.Component} 
 */
export function GithubShow(){

    const [ session ] = useContext(SessionContext);
    const service = GithubService.newInstance(session.token);
    const [ data , setData ] = useState({});
    const [ repos , setRepos ] = useState([]);
    const { username } = useParams();
    const navigate = useNavigate();

    const onClickBack = (e) => {
        
        e.preventDefault();

        navigate("/github");  
    };

    useEffect(() => {

        service.show(username, (res) => {
            
            if(res.error){

                swal("Loding details", res.message, "danger");
            }
            else {

                setData(res.data);

                service.repos(username, (res) => {

                    if(res.error){

                        swal("Loding repositories", res.message, "danger");
                    }
                    else {

                        setRepos(res.rows);
                    }
                });
            }
        });

    }, []);

    return(

        <Card>
            <CardBody>
                <Row>
                <Col sm={6}>
                    <Form>
                    <Media object src={data['avatar_url']} style={{ maxHeight: 128, maxWidth: 128 }} alt={ data['login'] || ""} />
                        <FormGroup row>
                            <Label sm={2}>Login</Label>
                            <Col sm={10}>{ data['login'] || "" }</Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>{ data['name'] || "" }</Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Location</Label>
                            <Col sm={10}>{ data['location'] || "" }</Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Since</Label>
                            <Col sm={10}>{ data['created_at'] || "" }</Col> 
                        </FormGroup>

                        <Button color="danger" onClick={onClickBack}>Back</Button>
                    </Form>
                </Col>
                <Col sm={6}>                
                    <ListGroup>
                        <ListGroupItem active>
                            Repositories
                        </ListGroupItem>
                        { repos.map(repo => <ListGroupItem>
                            
                                <a href={repo.html_url} target="_blank">{repo.name}</a>
                                <Badge color="primary" style={{marginLeft: "5px"}}>
                                    {repo.language || "Undefined"}
                                </Badge>   
                            </ListGroupItem>
                        )} 
                        </ListGroup>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}