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
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  UncontrolledAlert,
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
  Modal,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";


import PropTypes from "prop-types";

function Lock({ history, email }) {



  const [focused, setFocused] = React.useState(false);

  //const {email} = props;
  const [focusedEmail, setFocusedEmail] = React.useState(false);
  const [focusedPassword, setFocusedPassword] = React.useState(false);
  const [defaultModal, setdefaultModal] = React.useState(false);
  const [notificationModal, setnotificationModal] = React.useState(false);
  const [formModal, setformModal] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const [accountslist, setAccountsList] = useState([]);
  const firebase = window.firebase;
  const db = firebase.firestore();
  const notify = (type) => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Bootstrap Notify
          </span>
          <span data-notify="message">
            Turning standard Bootstrap alerts into awesome notifications
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

var email = localStorage.getItem('Email');

  function FacebookAuthenticate(history) {

    window.FB.login(function (response) {
      if (response.authResponse) {
        window.FB.api('/me', function (response) {
          //history.push('/Admin')
          { setformModal(true) }

          window.FB.getLoginStatus(function (response) {
            console.log(response)
            if (response.status === 'connected') {
              console.log(response)
              var User_Access_Token = response.authResponse.accessToken;
            }

            window.FB.api(
              `me/accounts`,
              'GET',
              { access_token: User_Access_Token },
              function (response) {
                setAccountsList(response.data);

                db.collection("Users").doc(email).set({
                  User_Access_Token: "Los Angeles",
                  state: "CA",
                  country: "USA"
              })
                
              });
          });

        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }

    }, { scope: 'business_management, email, pages_manage_cta, pages_manage_posts, pages_read_user_content, pages_show_list, public_profile, pages_manage_engagement, pages_read_engagement, read_insights, pages_manage_ads, business_management, ads_read' })

    function FacebokLogin() {



  
    }


  };

  const saveAccessToken = account => {
    localStorage.setItem('Page_Access_Token', account.access_token);
    history.push('/admin');
    console.log("ffffffff", localStorage.getItem('Page_Access_Token'));
  }

  return (
    <>
      <AuthHeader title="Facebook Authorise" lead="Grant Facebook Page Analytics access" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="4" md="3">
            <Card className="card-profile bg-secondary mt-5">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle border-secondary"
                      src={require("assets/img/theme/team-4.jpg").default}
                    />
                  </div>
                </Col>
              </Row>


              
              <CardBody className="pt-7 px-3">
                <div className="text-center">
                  <Button onClick={FacebookAuthenticate} className="btn-icon my-2 btn btn-facebook" color="info" type="button">
                    Facebook Login
                    </Button>

                  <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={formModal}
                    toggle={() => setformModal(false)}
                  >
                    <div className="modal-body p-0">
                      <Card className="bg-secondary border-0 mb-0">
                        <CardHeader className="bg-transparent pb-5">
                          <div className="text-muted text-center mt-2 mb-3 ">
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
                                  <div className="timeline-block">
                                    <span className="timeline-step badge-success">
                                      <i className="ni ni-bell-55" />
                                    </span>
                                    <div onClick={() => saveAccessToken(account)} className="timeline-content">
                                      <div className="d-flex justify-content-between pt-1">
                                        <div>
                                          <span className="text-muted text-sm font-weight-bold">
                                            {account.name}
                                          </span>
                                        </div>
                                        <div className="text-right">
                                        </div>
                                      </div>
                                      <h6 className="text-left mt-2 mb-0">
                                        {account.category}
                                      </h6>
                                    </div>
                                  </div>
                                  
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Lock;
