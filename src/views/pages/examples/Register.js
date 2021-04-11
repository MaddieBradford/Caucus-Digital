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
import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// import firebase from "firebase/app";

// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  ListGroupItem,
  ListGroup,
  Input,
  InputGroupAddon,
  CardTitle,
  CardText,
  InputGroupText,
  InputGroup,
  Container,
  Modal,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
//import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";


const firebase = window.firebase;
const db = firebase.firestore();

/*if (!db) {
  firebase.initializeApp({
    apiKey: "AIzaSyA3S6G0FJy5qCovuRMFuTfzpvRqg3yxwxY",
    authDomain: "caucus-17dce.firebaseapp.com",
    projectId: "caucus-17dce",
    storageBucket: "caucus-17dce.appspot.com",
    messagingSenderId: "398082497668",
    appId: "1:398082497668:web:cb111790ec85b9ceb4b6d1",
    measurementId: "G-8HF9VCWGDM"
  });
  db = firebase.firestore();
}*/




function Register({history}, props) {




  // Add a new document in collection "cities" with ID 'LA'

  const [focusedName, setfocusedName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [useremail, setUserEmail] = React.useState({});
  const [userpassword, setUserPassword] = React.useState({});
  const [accountslist, setAccountsList] = useState([]);
  const [defaultModal, setdefaultModal] = React.useState(false);
  const [notificationModal, setnotificationModal] = React.useState(false);
  const [formModal, setformModal] = React.useState(false);
  const [User_Access_Token, setUser_Access_Token] = useState([]);
  const [Page_Access_Token, setPage_Access_Token] = useState([]);
  const firebase = window.firebase;
  const db = firebase.firestore();


  const Signup = e => {
    e.preventDefault();
    const { email, password } = formValues;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUserEmail(email);
        setUserPassword(password);
        //Signed in 
        FacebookAuthenticate();
      }



    
      )}

  function FacebookAuthenticate(history) {

    window.FB.login(function (response) {
      if (response.authResponse) {
        window.FB.api('/me', function (response) {
          //history.push('/Admin')
         
          window.FB.getLoginStatus(function (response) {
            setUser_Access_Token(response.authResponse.accessToken)
            if (response.status === 'connected') {
            }
            { setformModal(true) }
            window.FB.api(
              `me/accounts`,
              'GET',
              { User_Access_Token: User_Access_Token },
              function (response) {
                
                setAccountsList(response.data)
              { setformModal(true) }
              });
          });

        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
        //history.push('/auth/register')
      }

    }, { scope: 'business_management, email, pages_manage_cta, pages_manage_posts, pages_read_user_content, pages_show_list, public_profile, pages_manage_engagement, pages_read_engagement, read_insights, pages_manage_ads, business_management, ads_read' })
  }

  const SetAccessToken = account => {
    db.collection("Users").doc(`${useremail}`).set({
      Page_Token: account.access_token,
      Page_ID: account.id,
      User_Token: User_Access_Token,
      Email: useremail,
      Password: userpassword,
      
      
  })
  history.push('/Admin');
    
  }

  
  

  const handleInputChange = e => setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckBoxChange = e => setFormValues(prev => ({ ...prev, [e.target.name]: e.target.checked }));


  return (
    <>
      <AuthHeader
        title="Create an account"
        lead=""
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up and authorise your Facebook Account</small>
                </div>
                <Form onSubmit={Signup} role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        required
                        onChange={handleInputChange}
                        value={formValues.name || ''}
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
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
                        onChange={handleInputChange}
                        value={formValues.email || ''}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
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
                        onChange={handleInputChange}
                        value={formValues.password || ''}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          name="agree"
                          required
                          onChange={handleCheckBoxChange}
                          checked={formValues.agree}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="submit">
                      Create account
                    </Button>

                    <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={formModal}
                    toggle={() => setformModal(true)}
                  >
                    <div className="modal-body p-0">
                      <Card className="bg-secondary border-0 mb-0">
                        <CardHeader className="bg-transparent pb-5">
                          <div className="h2 font-weight-bold text-center mt-1 mb-0 ">
                            <small>Select Your Primary Page</small>
                          </div>
                          <div className="btn-wrapper text-center">

                            <CardBody>
                              <div
                                className="timeline timeline-one-side"
                                data-timeline-axis-style="dashed"
                                data-timeline-content="axis"
                              >
{accountslist.map(account => (
<Card className="bg-gradient-primary">
<CardBody>
  <Row>
    <div onClick={() => SetAccessToken(account)} className="col">
      <CardTitle className="text-uppercase text-muted mb-0 text-white">
      
      </CardTitle>
      <span className="h2 font-weight-bold mb-0 text-white">
      {account.name}
      </span>
    </div>
    {/* <Col className="col-auto">
    <a
                         className="avatar rounded-circle"
                         href="#pablo"
                         onClick={() => SetAccessToken(account)}
                       >
                         <img
                           alt="..."
                           src={require("assets/img/theme/team-1.jpg").default}
                         />
                       </a>
    </Col> */}
  </Row>
  <p className="mt-3 mb-0 text-sm">
    <span className="text-nowrap text-light">
    {account.category}
    </span>
  </p>
</CardBody>
</Card>
                  
                                
                                


                                  
                                ))}

                                {/*<div className="timeline-block">
                                  <span className="timeline-step badge-success">
                                    <i className="ni ni-bell-55" />
                                  </span>
                                  <div className="timeline-content">
                                    <div className="d-flex justify-content-between pt-1">
                                      <div>
                                        <span className="text-muted text-sm font-weight-bold">
                                          Page Name
                          </span>
                                      </div>
                                      <div className="text-right">
                                      </div>
                                    </div>
                                    <h6 className="text-left mt-2 mb-0">
                                      Likes
                      </h6>
                                  </div>
                                </div>*/}
                              </div>
                            </CardBody>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  </Modal>


                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
