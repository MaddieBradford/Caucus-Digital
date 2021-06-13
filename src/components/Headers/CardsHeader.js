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
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import Modals2 from "../../views/pages/dashboards/Modals2.js";
import ParticlesBg from 'particles-bg'
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import numeral from "numeral";
const firebase = window.firebase;

const relDiff = (a, b) => {

  return 100 * (b - a) / a;
}


function CardsHeader({ name, Engagement_7days, Engagement_Today, parentName, followers, AdPostEngagement, totalpostclicks, oldpagefans, postavengagement, postreach, newfollows, oldengagement, oldimpressions, followsweek }) {

  const history = useHistory()
  const [data, setData] = useState(null);



  let x = (oldpagefans[1]?.values[6]?.value)
  let y = (followers)
  let z = (y) - (x)

  //old     //new
  const impressDiff = relDiff(oldimpressions[1]?.values[0]?.value, oldimpressions[1]?.values[3]?.value);
  const engagementDiff = relDiff(oldengagement, postavengagement);
  const followersdiff = relDiff(oldpagefans, newfollows);
  const followerdiff = relDiff(oldpagefans[1]?.values[0]?.value, oldpagefans[1]?.values[6]?.value);

  const logout = () => {
    window.FB.logout(function (response) {
      firebase.auth().signOut().then(() => {
        history.push('/')
      }).catch((error) => {
        // An error happened.
      });
      history.push('/')
    });
  }

  const [show, setShow] = useState(false) 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    
    <>
   <ParticlesBg color="#CCCCCC" num={40} type="cobweb" rps="0.4" bg={true} />
      <div

 

        className="header pb-6 d-flex align-items-center "
        
        style= {{
          
          minHeight: "500px",
          backgroundImage:
            'url("' + 
            require("assets/img/theme/pipipi.jpeg").default +
            '")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
          
        }}
        
      >
     
        <span className="mask bg-gradient-default opacity-8 " /> 
       
   
        <Container className="d-flex align-items-center" fluid>
     
          <Row>
         
            <Col lg="7" md="10">
           
              <h1 className="display-2 text-white">{name}</h1>
              <p className="text-white mt-0 mb-5">
                This is your dashboard. You can review recent posts, plan new posts,
                check performance data and view audience demographics here.
              </p>
           
              
            </Col>
            
          </Row>
          
          <Row>
              <Col md="6" xl="3">





                <Col md="6" xl="3"></Col>
                <Card className="card-stats bg-white">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-default text-default mb-0"
                        >
                        Engaged
        </CardTitle>
                        <span className="h2 font-weight-bold text-default mb-0">{numeral(postavengagement).format('0,0')}</span>
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-blue rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col> */}
                    </Row>
                    <p className="mt-3 mb-0 text-default text-sm">
                      <span className={`${engagementDiff > 0 ? 'text-default' : 'text-default'} mr-2`}>
                        <i className={`fa ${engagementDiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {engagementDiff.toFixed(2) + "%"}
                      </span>{" "}
                      <span className="text-nowrap text-default">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats bg-white">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-default mb-0"
                        >
                        Reached
         </CardTitle>
                        <span className="h2 font-weight-bold text-default mb-0">{numeral(oldimpressions).format('0,0')}</span>
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-blue rounded-circle shadow">
                          <i className="ni ni-notification-70" />
                        </div>
                      </Col> */}
                    </Row>
                    <p className="mt-3 mb-0 text-default text-sm">
                      <span className={`${impressDiff > 0 ? 'text-default' : 'text-default'} mr-2`}>
                        <i className={`fa ${impressDiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {impressDiff.toFixed(2) + "%"}
                      </span>{" "}
                      <span className="text-nowrap text-default">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats bg-white">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-default mb-0"
                        >
                        New Likes
        </CardTitle>

                        <span className="h2 font-weight-bold text-default mb-0">{numeral(newfollows).format('0,0')}</span>
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-blue rounded-circle shadow">
                          <i className="ni ni-single-02" />
                        </div>
                      </Col> */}
                    </Row>
                    <p className="mt-3 mb-0 text-default text-sm">
                      <span className={`${followerdiff > 0 ? 'text-default' : 'text-default'} mr-2`}>
                        <i className={`fa ${followerdiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {followerdiff.toFixed(2) + "%"}
                      </span>{" "}
                      <span className="text-nowrap text-default">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats bg-white">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-default mb-0"
                        >
                        Total Likes
         </CardTitle>
                        <span className="h2 font-weight-bold text-default mb-0">{numeral(followers).format('0,0')}</span>
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-blue rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col> */}
                    </Row>
                    <p className="mt-3 mb-0 text-sm text-default">
                      <span className={`${followersdiff > 0 ? 'text-default' : 'text-default'} mr-2`}>
                        <i className={`fa ${followersdiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {followersdiff.toFixed(2) + "%"}
                      </span>{" "}
                      <span className="text-nowrap text-default">Since last week</span>
                    </p>
                  </CardBody>
                  {show && <Modals2 handleClose={handleClose} show={show} handleShow={handleShow} />}
                </Card>
                <Col className="text-right" lg="6" xs="5">
 
               
              </Col>
          
              </Col>
            </Row>
           
        </Container>
        
      </div>
  
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
