import { useState, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Alert, Container, Row, Col, Card, CardBody, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import { ErrorContext } from "../../contexts/error";
import AuthService from "../../services/auth";
import Viewport from '../layout/viewport';
import { formDataToJson } from "../abstractCrud";
import swal from 'sweetalert';


export function AuthLayout() {
    
  return (
      <Viewport breadcrumbs={[['Home', 'Settings']]}>
          <Outlet />
      </Viewport>
  );
}

/**
 * @link https://j19ly.csb.app/
 * @link https://codesandbox.io/s/reactstrap-login-j19ly
 */
export function AuthLogin(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setLoggedin] = useState(false);
  const [, setSession ] = useContext(SessionContext);
  const [ error, setError ] = useContext(ErrorContext);
  
  const onSubmit = (e) => {

    e.preventDefault();

    const service = AuthService.newInstance();
    
    service.login(username, password, (res) => {

      if(res.error) {
        
        setError({level: "warning", message: res.message || "Internal Error Server"});
      }
      else {

        const token = res.data.token;

        service.setToken(token).getFullAccess((res) => {

          if(res.error) {
            setError({level: "warning", message: res.message || "Internal Error Server"});
          }
          else {

            setSession({ ...res.data, token: token });
            setLoggedin(true);
          }
        });
      } 
    });
  };

  return (
    <Container style={{marginTop: '2rem'}}>
      {isLoggedin && (
        <Navigate to="/" replace={true} />
      )}
      <Row>
        <Col>
          <Card className="mb-5">
            <CardBody>
              
              { error && <Alert color="warning">
                  <h4 className="alert-heading">{ error.code }</h4>
                  <p>{ error.message }</p>
                </Alert>
              }
                
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email@hostname.com"
                    onChange={(e) => setUsername(e.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </FormGroup>
                <Button type="submit" color="primary">
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export function AuthSetting(){

  const [ session ] = useContext(SessionContext);
  const service = AuthService.newInstance(session.token);
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const onFormSubmit = (e) => {

    e.preventDefault();

    const body = formDataToJson(new FormData(e.target));

    service.saveSetting(body, (res) => {
      
      if(res.fields){

        let errors = {};

        for(const [field, data] of Object.entries(res.fields)){

            errors[field] = data.msg;
        }
        
        setError(errors);  
      } 
    });
  };

  useEffect(function(){

    service.loadSetting((res) => {

      if(res.error){

        swal("Danger", res.message, "danger");  
      }
      else {

        setData(res.data);
      }
    });

  }, [])

  return (

    <Card>
      <CardBody>
          <Col sm={8}>
              <Form onSubmit={onFormSubmit} autoComplete="off">
                <FormGroup row>
                  <Label sm={3}>Name</Label>
                    <Col sm={9}>
                        <Input type="text" name="name" invalid={error['name'] ? true : false} placeholder="" autoComplete="off" defaultValue={data['name'] || ''} />
                        <FormFeedback>{ error['name'] || "" }</FormFeedback>
                    </Col> 
                </FormGroup>
                <FormGroup row>
                  <Label sm={3}>Current Password</Label>
                    <Col sm={9}>
                        <Input type="password" name="current_password" invalid={error['current_password'] ? true : false} placeholder="" autoComplete="off" defaultValue="" />
                        <FormFeedback>{ error['current_password'] || "" }</FormFeedback>
                    </Col> 
                </FormGroup>
                <FormGroup row>
                  <Label sm={3}>New Password</Label>
                    <Col sm={9}>
                        <Input type="password" name="new_password" invalid={error['new_password'] ? true : false} placeholder="" autoComplete="off" defaultValue="" />
                        <FormFeedback>{ error['new_password'] || "" }</FormFeedback>
                    </Col> 
                </FormGroup>
                <Button color="primary">Save</Button>
              </Form>
          </Col>
      </CardBody>
  </Card>
    );
}