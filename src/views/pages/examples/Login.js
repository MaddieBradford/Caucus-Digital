/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useHistory } from "react-router";
// nodejs library that concatenates classes
import classnames from "classnames";
import ParticlesBg from 'particles-bg';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import Dashboard from '../dashboards/Dashboard';
import { convertCompilerOptionsFromJson } from "typescript";

const firebase = window.firebase;

function Login({ history }) {
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const {email, password} = formValues;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {

        history.push('/Admin')
        window.FB.login(function(response) {

          if (response.authResponse) {
           window.FB.api('/me', function(response) {
            history.push('/Admin')
  
           });
          } else {
          // console.log('User cancelled login or did not fully authorize.');
          }
  
      }, {scope: 'ads_management, pages_messaging, email, pages_manage_cta, pages_manage_posts, pages_read_user_content, pages_show_list, public_profile, pages_manage_engagement, pages_read_engagement, read_insights, pages_manage_ads, ads_read'})
  



        history.push('/admin');
      })
      .catch((error) => {
      });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setFormValues(prev => ({ ...prev, [name]: checked }));
  }

  return (
    <>
  
      <AuthHeader
        title="Welcome"
        lead="Securely sign in and authorise access to Facebook."
      />
      <Container className="mt--9 pb-6">
        
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in and authorise your Facebook Account</small>
                </div>
                <Form onSubmit={handleSubmit} role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        value={formValues.email || ''}
                        onChange={handleInputChange}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        value={formValues.password || ''}
                        onChange={handleInputChange}                        
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                      name="remember"
                      checked={formValues.remember || false}
                      onChange={handleCheckboxChange}
                    />
                    {/* <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label> */}
                  </div>



                  <div className="text-center">

                    <Button
                      className="btn-icon my-2"
                      color="facebook"
                      type="submit"
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fab fa-facebook" />
                      </span>
                      <span className="btn-inner--text">Login with Facebook</span>
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            {/* <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
      <ParticlesBg color="#CCCCCC" num={40} type="cobweb" rps="0.2" bg={true} />

    </>
  );
}

export default Login;
