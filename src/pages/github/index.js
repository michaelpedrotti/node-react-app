import { useContext, useState, useEffect } from "react";
import GithubService from '../../services/github';
import { SessionContext } from "../../contexts/session";
import { AbstractCrudLayout } from "../abstractCrud";
import swal from 'sweetalert';
import { Table, Row, Col, Form,  Card, FormGroup, Label, CardBody, Button } from "reactstrap";
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
    const state = useState({});
    const [ data ] = state;

    const { username } = useParams();
    const [ , setData ] = state;

    const navigate = useNavigate();

    const onClickBack = (e) => {
        
        e.preventDefault();

        navigate("/github");  
    };

    useEffect(() => {

        service.show(username, (res) => {
            
            if(res.error){

                swal("Danger", res.message, "danger");
            }
            else {

                setData(res.data);
            }
        });

    }, []);

    return(

        <Card>
            <CardBody>
                <Col sm={8}>
                    <Form>
                        <FormGroup row>
                            <Label sm={2}>Login</Label>
                            <Col sm={10}>{ data['login'] || "" }</Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>{ data['name'] || "" }</Col> 
                        </FormGroup>

                        <Button color="danger" onClick={onClickBack}>Back</Button>
                    </Form>
                </Col>
            </CardBody>
        </Card>
    );
}