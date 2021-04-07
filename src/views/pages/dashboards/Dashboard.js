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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import List from "list.js";
import numeral from 'numeral';
import _, { isNull, subtract } from 'lodash';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  CardTitle,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import CardsHeader from "components/Headers/CardsHeader.js";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample7,
  chartExample4,
  chartExample5,
  chartExample6,
} from "variables/charts.js";
import { render } from "preact";
import { useHistory } from "react-router";
import ReactWordcloud from 'react-wordcloud';
import { VectorMap } from "react-jvectormap";
import './Dashboard.css'
const firebase = window.firebase;
var moment = require('moment');
var tz = require('moment-timezone');


function Dashboard(props) {
  const { impressions, newfollows, engagement, totalreacts, oldpagefans, postcomment, followers, posts, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments } = props;
  const [ranking, setRanking] = useState([]);
  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()
  const data2 = props.data
  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  const [pages2, setPages2] = useState([]);
  const [numerouno, setnumerouno] = useState([]);
  const [numerouno2, setnumerouno2] = useState([]);

  //console.log("WEEKLY", postcountweek.length)

  const db = firebase.firestore();
  const [activeNav, setActiveNav] = React.useState(1);
  const [wordss, setWordss] = React.useState({});
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  let mapData = {
    AU: 760,
    BR: 550,
    CA: 120,
    DE: 1300,
    FR: 540,
    GB: 690,
    GE: 200,
    IN: 200,
    RO: 600,
    RU: 300,
    US: 2920,
  };
  useEffect(() => {

    

    var date = moment().format('YYYY-MM-DD');
    var newYork = moment.tz(`${date} ${fansonline}:00:00`, "America/Los_Angeles");
    var AUD = newYork.clone().tz("Australia/Melbourne");
    setnumerouno(AUD.subtract(15, 'minutes').format('hh:mm A'));
    console.log("TIMEEEE", `${date} ${fansonline}:00:00:00`)

    var newYork2 = moment.tz(`${date} ${fansonline2}:00:00`, "America/Los_Angeles");
    var AUD2 = newYork2.clone().tz("Australia/Melbourne");
    setnumerouno2(AUD2.subtract(15, 'minutes').format('hh:mm A'));
    console.log("TIMEEEE2", `${date} ${fansonline2}:00:00:00`)

    db.collection("Page_Posts").doc(pagename).collection("Posts").get().then(function (querySnapshot) {
      setPages2(querySnapshot.docs.map(d => d.data()));
      console.log("ddddddddff", querySnapshot.docs.map(d => d.data()))
    });

    db.collection("Pages").get().then((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()));
    });
  }, [])


  useEffect(() => {


    if (pagename) {
      (async () => {
        try {
          let allCommentIds = await db.collection("Comments").get();
          allCommentIds = allCommentIds.docs.map(doc => doc.id);

          let allComments = await Promise.all(allCommentIds.map(async cId => {
            const comments = await db.collection("Comments").doc(cId).collection('Comments').get();
            return comments.docs.map(doc => doc.data());
          }));
          allComments = _.flatten(allComments);
          console.log('allComments==>>', allComments);

          let words = await db.collection("Word_Cloud_Filter").doc('Words').get();
          words = words.data().Words.map(w => w.trim().toLowerCase());
          const textLegend = {};
          allComments.forEach(item => {
            item.comment?.split(' ').forEach(w => {
              w = w.trim().toLowerCase();
              textLegend[w] = (textLegend[w] || 0) + (words.includes(w) ? 1 : 0)
            });
          });
          const filteredTextLegend = {};
          Object.entries(textLegend).forEach(([k, v]) => {
            if (v) filteredTextLegend[k] = v;
          })
          setWordss(filteredTextLegend)
          console.log('hey==**', filteredTextLegend)
        } catch (err) {
          console.log('an err occured==**', err)
        }
      })();
    } else {
      console.log('pagenmae not defind==**')
    }
  }, [])

  const newWords = Object.entries(wordss).map(([k, v]) => ({ text: k, value: v }));

  const callbacks = {
    getWordColor: word => word.value > 1 ? "white" : "white",
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");

  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const firstListRef = useRef(null);
  useEffect(() => {
    if (pages.length) {
      new List(firstListRef.current, {
        valueNames: ["PageName", "Reach", "Engagement", "Followers", "PostsWeek"],
        listClass: "list",
      });

    }

    

  }, [pages.length]);
  // PageID,
  // icon: post?.icon,
  // created_time: post?.created_time,
  // admin_creator: post?.admin_creator,
  // reactions: post?.reactions?.summary?.total_count,
  // shares: post?.shares?.count data-sort="Type" scope="col">
                  //     Type
                  //     </th>
                  // <th className="sort" data-sort="Date" scope="col">
                  //   Date
                  //     </th>
                  // <th className="sort" data-sort="Reactions" scope="col">
                  //   Reactions
                  //     </th>
                  // <th scope="col" className="sort" data-sort="Shares" scope="col">
                  //   Shares
                  //         </th>
                  //         <th className="sort" data-sort="Admin" scope="col">
  const firstListRef2 = useRef(null);
  useEffect(() => {
    if (pages2.length) {
      new List(firstListRef2.current, {
        valueNames: ["Type", "Date", "Reactions", "Shares", "Admin"],
        listClass: "list",
      });

    }
  }, [pages2.length]);
  console.log("APPLE", pages2)


  let groups = age[0]?.values[0]?.value && Object.entries(age[0]?.values[0]?.value).map(([k, v]) => ({ group: k.split('.')[1], value: v }));
  groups = _.groupBy(groups, 'group');
  const groupedSum = _.sortBy(Object.entries(groups).map(([k, v]) => {
    return { age: k, sum: v.map(i => i.value).reduce((a, b) => a + b) }
  }), 'sum');
  chartExample2.data.labels = groupedSum.map(i => i.age);
  chartExample2.data.datasets[0].data = groupedSum.map(i => i.sum);


  let groups2 = age[0]?.values[0]?.value && Object.entries(age[0]?.values[0]?.value).map(([k, v]) => ({ group: k.split('.')[0], value: v }));
  groups2 = _.groupBy(groups2, 'group');
  const groupedSum2 = _.sortBy(Object.entries(groups2).map(([k, v]) => {
    return { gender: k, sum: v.map(i => i.value).reduce((a, b) => a + b) }
  }), 'sum');
  chartExample5.data.labels = groupedSum2.map(i => i.gender);
  chartExample5.data.datasets[0].data = groupedSum2.map(i => i.sum);
  console.log('sgeed==>>', groupedSum2, 'ggggg', chartExample5.data);


  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (

    <>
      <CardsHeader comments={comments} fansonline={fansonline} oldpagefans={oldpagefans} postcountweek={postcountweek} oldengagement={oldengagement} oldimpressions={oldimpressions} followsweek={followsweek} impressions={impressions} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach2={fourteenreach2} fourteenreach={fourteenreach} pagename={pagename} name="Page Overview" parentName="Caucus" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="8">
            <Card className="bg-default">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-light text-uppercase ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 text-white mb-0">{pagename + " " + "Reach"}</h5>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem className="mr-2 mr-md-0">
                        {/* <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Two Weeks</span>
                          <span className="d-md-none">M</span>
                        </NavLink> */}
                      </NavItem>
                      <NavItem>
                        {/* <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">W</span>
                        </NavLink> */}
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1(fourteenreach)[chartExample1Data]}
                    options={chartExample1(fourteenreach).options}
                    id="chart-sales-dark"
                    className="chart-canvas"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4">
            <Card className="bg-gradient-primary">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Best Times to Post
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      {numerouno} or {numerouno2}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-purple rounded-circle shadow">
                      <i className="ni ni-time-alarm" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">

                  <span className="text-nowrap text-light">
                    Based on your active followers
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-primary">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Average Post Reach
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      2,300
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-purple rounded-circle shadow">
                      <i className="ni ni-spaceship" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-white mr-2">
                    <i className="fa fa-arrow-up" />

                  </span>
                  <span className="text-nowrap text-light">
                    Since last week
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-primary">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Average post engagement
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      450
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-purple rounded-circle shadow">
                      <i className="ni ni-controller" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <span className="text-white mr-2">
                    <i className="fa fa-arrow-up" />

                  </span>
                  <span className="text-nowrap text-light">
                    Since last week
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>




        </Row>
        <Row>
          <Col xl="8">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-1">Top Three Leaderboard</h3>
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
                        {pages.slice(0, 3).map((page, i) => (
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
                            <td className="Reach">{numeral(page.Reach).format('0,0')}</td>
                            <td className="Engagement">
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">{page.Engagement}</span>
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
            <div className="card-deck">

            </div>
          </Col>
          <Col xl="4">
            <Card className="bg-gradient-danger">
              <CardBody>
                <Row className="justify-content-between align-items-center">
                  <div className="col">
                    <ReactWordcloud words={newWords} callbacks={callbacks} />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="7">

          </Col>
        </Row>
        <div className="card-deck flex-column flex-xl-row">
          <Card>
            <CardHeader className="border-0">
              <h3 className="mb-0">Latest Posts Ranked</h3>
            </CardHeader>
            <div className="table-responsive"  />
            <div className="table-responsive myTable" ref={firstListRef2}>
              <Table className="align-items-center table-flush" responsive>
                
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="Type" scope="col" >
                      Type
                        </th>
                    <th className="sort" data-sort="Date" scope="col">
                      Date
                        </th>
                    <th className="sort" data-sort="Reactions" scope="col">
                      Reacts
                        </th>
                    <th scope="col" className="sort" data-sort="Shares" scope="col">
                      Shares
                            </th>
                            <th className="sort" data-sort="Admin" scope="col">
                            Admin
                            </th>
                          <th scope="col" />
                        </tr>
                      </thead>
                <tbody className="list">
                  {pages2.slice(0, 10).map((page, i) => (
                    <tr key={i}>
                      <td className="Type" scope="row">
                        <Media className="align-items-center">
                          <a
                          
                            className="avatar rounded-circle mr-0"
                            href="#pablo"
                            onClick={() => openInNewTab(`${page.url}`)}
                          >
                            <div className="icon icon-shape bg-white text-purple rounded-circle shadow">
                            
                            <i className={page.icon === "https://www.facebook.com/images/icons/photo.gif" ?  "ni ni-image"
                             : page.icon === "https://www.facebook.com/images/icons/video.gif" ?  "ni ni-button-play" :  "ni ni-caps-small" } 
                              onClick={() => openInNewTab(`${page.url}`)}/>

                  
                           </div>
                          </a>
                        </Media>
                      </td>
                      <td onClick={() => openInNewTab(`${page.url}`)} className="Date">{page?.created_time.slice(0, 10)}</td>
                      <td  className="Reactions">{page?.reactions}</td>
                      <td  className="Shares">{page?.shares}</td>
                      <td  className="Admin">{page?.admin_creator.split(" ")[0]}</td>

                    </tr>
                  ))}
                </tbody>




              </Table>
            </div>
          </Card>
          <Card>
            <CardHeader className="bg-transparent">
              <h2 className="h3 mb-0">Gender Breakdown</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Doughnut
                  data={chartExample5.data}
                  options={chartExample5.options}
                  className="chart-canvas"
                  id="chart-doughnut"
                />
              </div>

            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h5 className="h3 mb-0">Age Breakdwon</h5>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar
                  data={chartExample2.data}
                  options={chartExample2.options}
                  className="chart-canvas"
                  id="chart-bars3"
                />
              </div>
            </CardBody>
          </Card>

        </div>
      </Container>
    </>
  );
}


export default Dashboard;
