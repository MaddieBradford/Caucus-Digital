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
import React, {useState, useEffect}  from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from "react-router";
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


const relDiff = (a, b) => {
  console.log('aaa==>>', a, 'bbbb', b)
  return  100 * ( b - a ) / a;
 }


function CardsHeader({ name, parentName, followers, oldpagefans, postreach, newfollows, oldengagement, oldimpressions, followsweek}) {

  const history = useHistory()
  const [data, setData] = useState(null);console.log(10-"1");
console.log("olddd22", (followers[1]?.values[6]?.value) - (oldpagefans[1]?.values[6]?.value) )
console.log("olddd3", followers[1]?.values[6]?.value )



let x = (oldpagefans[1]?.values[6]?.value)
let y = (followers)
let z = (y) - (x)
console.log("aaaaalpaaa", z)
console.log("aaaaolddd22", x )
console.log("aaaaolddd3", y )
//old     //new
  const impressDiff = relDiff(oldimpressions[1]?.values[0]?.value, oldimpressions[1]?.values[3]?.value);
  const engagementDiff = relDiff(oldengagement[1]?.values[0]?.value, oldengagement[1]?.values[3]?.value);
  const followersdiff = relDiff(z, followers);
  const followerdiff = relDiff(oldpagefans[1]?.values[0]?.value, oldpagefans[1]?.values[6]?.value);

  useEffect(() => {
   // if (typeof (FB) !== 'undefined') {
    window.FB.api(
      '/me',
      'GET',
      {"fields":"first_name,picture"},
      function(response) {
        setData(response);

      }
    );
  //  }
  }, [])



  const logout = () => {
    window.FB.logout(function(response) {

      history.push('/')
     });
  }

  return (
    <>
      <div className="header bg-info pb-6">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">{name}</h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col className="text-right" lg="6" xs="5">
              </Col>
            </Row>

            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          People Engaged
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{numeral(oldengagement[1]?.values[3]?.value).format('0,0')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className={`${engagementDiff > 0 ? 'text-success' : 'text-danger'} mr-2`}>
                        <i className={`fa ${engagementDiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {engagementDiff.toFixed(2)+"%"}
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
   {/* { {impressions.map(impression => (
                        <div>
                        <p>{impression.name}</p>
                        {impression.values.map(v => <span>{v.value}</span>)}
                        </div>
                      ))} }
                      {impressions[2]?.values[1]?.value} */}

                          People Reach
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{numeral(oldimpressions[1]?.values[3]?.value).format('0,0')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-notification-70" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                    <span className={`${impressDiff > 0 ? 'text-success' : 'text-danger'} mr-2`}>
                        <i className={`fa ${impressDiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {impressDiff.toFixed(2)+"%"}
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Followers
                        </CardTitle>
                        
                        <span className="h2 font-weight-bold mb-0">{numeral(oldpagefans[1]?.values[6]?.value).format('0,0')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-single-02" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                    <span className={`${followerdiff > 0 ? 'text-success' : 'text-danger'} mr-2`}>
                        <i className={`fa ${followerdiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {followerdiff.toFixed(2)+"%"}
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Likes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{numeral(followers).format('0,0')}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                    <span className={`${followersdiff > 0 ? 'text-success' : 'text-danger'} mr-2`}>
                        <i className={`fa ${followersdiff > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> {followersdiff.toFixed(2)+"%"}
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
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
