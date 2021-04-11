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
import React, { useState, useEffect, useRef } from "react";
// javascript plugin that creates a sortable object from a dom object
import List from "list.js";
import PropTypes from "prop-types";
import numeral from 'numeral';
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardBody,
  CardTitle,
  Col,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useHistory } from "react-router";

const firebase = window.firebase;


function Sortable({ impressions, newfollows, engagement, totalreacts, oldpagefans, postcomment, followers, posts, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments }) {
  const [ranking, setRanking] = useState([]);
  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()

  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  const [pages2, setPages2] = useState([]);
  const [numerouno, setnumerouno] = useState([]);
  const [numerouno2, setnumerouno2] = useState([]);

  const firstListRef = useRef(null);

  const db = firebase.firestore();


  useEffect(() => {



    db.collection("Pages").get().then((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()).sort((a,b) => a.Reach > b.Reach ? -1 : 1));
    });





    if (pages.length) {
      new List(firstListRef.current, {
        valueNames: ["PageName", "Reach", "Engagement", "Followers", "PostsWeek"],
        listClass: "list",
      });

    }
  }, [pages.length]);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  console.log("batttt", engagement)

  const nearestThousand = value => {
    let rangeValue;
    switch (true) {
      case value == 0:
        rangeValue = 0;
        break;
      case value < 100:
        rangeValue = '<100';
        break;
      case value < 1000:
        rangeValue = '<1000';
    }
    const valStr = value.toString();
    const valStrLen = valStr.length - 1;
    const factor = Math.pow(10, valStrLen);
    console.log('valStr==>>', value, 'bbb', valStrLen, 'hhhhhh', factor)
    return  rangeValue === 0 ? rangeValue : (rangeValue || `<${numeral(Math.round(value/factor)*factor).format('0,0')}`);
  }

  return (
    <>
      <SimpleHeader name="Leaderboard" parentName="Caucus" />


      <Container className="mt--6" fluid>



        <Row>

          <div className="col">
            <Row>

              <Col md="6" xl="3">
                <Card className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Average Engagement
                    </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                        {numeral(pages.reduce((a,b) => (a + parseFloat(b.Engagement)), 0)/pages.length).format('0,0')}
                        </span>

                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Average Reach
                    </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          {numeral(pages.reduce((a,b) => (a + parseFloat(b.Reach)), 0)/pages.length).format('0,0')}
                        </span>

                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Average Page Likes
                    </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                        {numeral(pages.reduce((a,b) => (a + parseFloat(b.Followers)), 0)/pages.length).format('0,0')}
                        </span>

                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Average Posts P/WEEK
                    </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                        {numeral(pages.reduce((a,b) => (a + parseFloat(b.PostsWeek)), 0)/pages.length).format('0,0')}
                        </span>

                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-1">Caucus Benchmark</h3>
              </CardHeader>

              <div className="table-responsive" />
              <div className="table-responsive" ref={firstListRef}>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th className="sort" data-sort="PageName" scope="col">
                        Name
                        </th>
                      <th className="sort" data-sort="Reach" scope="col">
                        Reach
                        </th>
                      <th className="sort" data-sort="Engagement" scope="col">
                        Engagement
                        </th>
                      <th scope="col" className="sort" data-sort="Followers">Page Likes</th>
                      <th className="sort" data-sort="PostsWeek" scope="col">
                        Posts
                        </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody className="list">
                    {pages.map((page, i) => (
                      <tr key={i}>
                        <td className="PageName" scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={page.PageImage}
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">{page.PageName}</span>
                            </Media>
                          </Media>
                        </td>
                        <td className="Reach">{nearestThousand(page.Reach)}</td>
                        <td className="Engagement">
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-warning" />
                            <span className="status">{(page.Engagement)}</span>
                          </Badge>
                        </td>
                        <td className="Followers">{page.Followers}</td>
                        <td className="PostsWeek">
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">{page.PostsWeek}</span>
                            <div>
                              <Progress max="16" value={page.PostsWeek} color="warning" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                        </td>
                      </tr>
                    ))}
                  </tbody>




                </Table>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
Sortable.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};
export default Sortable;
