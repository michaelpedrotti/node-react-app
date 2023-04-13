import { useContext, useState, useEffect } from "react";
import GithubService from '../../services/github';
import { SessionContext } from "../../contexts/session";
import { AbstractCrudForm, AbstractCrudIndex, AbstractCrudLayout, AbstractCrudShow } from "../abstractCrud";
import swal from 'sweetalert';
import { Table, Row, Col,  Card, FormGroup, Label, CardHeader, CardBody, Collapse, Input, Pagination, PaginationItem, 
    PaginationLink,  Form, FormFeedback, Button } from "reactstrap";
import { Link } from "react-router-dom";

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

                    console.log('filter', filter);
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
                                    <td >{ row.id }</td>
                                    <td >{ row.login }</td>
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