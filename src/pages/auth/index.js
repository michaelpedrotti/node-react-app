import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import AuthService from "../../services/auth";


/**
 * @link https://j19ly.csb.app/
 * @link https://codesandbox.io/s/reactstrap-login-j19ly
 */
export function LoginIndex(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setLoggedin] = useState(false);
  const [error, setError] = useState("");
  const [, setSession ] = useContext(SessionContext);

  const onSubmit = (e) => {

    e.preventDefault();

    const service = AuthService.newInstance();
    
    service.login(username, password, (res) => {

      if(res.error) {
        
        setError(res.message || "Internal Error Server");
      }
      else {

        const token = res.data.token;

        service.setToken(token).getFullAccess((res) => {

          if(res.error) {
            setError(res.message || "Internal Error Server");
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
              
              { error && <div>{error}</div>}
                
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