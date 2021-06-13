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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";



function AuthFooter() {
  return (
    <>
      <footer className="py-5" id="footer-main">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold text-white ml-1"
                 
                  target="_blank"
                >
                <a href={"mailto:maddie@caucus.digital"}> MADDIE LEE BRADFORD ABN: 78 817 645 517 </a>
                </a>
              </div>
            </Col>
            <Col xl="6">
              
             
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
