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
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
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
  PopoverBody, 
  UncontrolledPopover,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components

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
const firebase = window.firebase;
var moment = require('moment');
var tz = require('moment-timezone');


function Tables(props) {
  const { impressions, newfollows, engagement, totalreacts, postcoommentlikes, totalpostclicks, oldpagefans, postavengagement, postreach, postcomment, followers, posts, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments } = props;
  const [ranking, setRanking] = useState([]);
  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()
  const data2 = props.data
  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  const [posticon, setposticon] = useState([]);
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

    console.log("useEffect 19")

    var date = moment().format('YYYY-MM-DD');
    var newYork = moment.tz(`${date} ${fansonline}:00:00`, "America/Los_Angeles");
    var AUD = newYork.clone().tz("Australia/Melbourne");
    setnumerouno(AUD.subtract(15, 'minutes').format('hh:mm A'));
    
    var newYork2 = moment.tz(`${date} ${fansonline2}:00:00`, "America/Los_Angeles");
    var AUD2 = newYork2.clone().tz("Australia/Melbourne");
    setnumerouno2(AUD2.subtract(15, 'minutes').format('hh:mm A'));
 //   console.log("TIMEEEE2", `${date} ${fansonline2}:00:00:00`)



    db.collection("Page_Posts").doc(pagename).collection("Posts").get().then(function (querySnapshot) {
      setPages2(querySnapshot.docs.map(d => d.data()));

    });

    db.collection("Pages").get().then((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()));
    });
  }, [])


  useEffect(() => {
    console.log("useEffect 20")

    if (pagename) {
      (async () => {
        try {
          let allCommentIds = await db.collection("Comments").get();
          allCommentIds = allCommentIds.docs.map(doc => doc.id);

          let allComments = await Promise.all(allCommentIds.map(async cId => {
            const comments = await db.collection("Comments").doc(pagename).collection('Comments').get();
            return comments.docs.map(doc => doc.data());
          }));
          allComments = _.flatten(allComments);
     

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
         
        } catch (err) {
         // console.log('an error occured==**', err)
        }
      })();
    } else {
     // console.log('pagenmae not defind==**')
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
    console.log("useEffect 21")
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
    console.log("useEffect 22")
    if (pages2.length) {
      new List(firstListRef2.current, {
        valueNames: ["Type", "Date", "Reactions", "Shares", "Admin"],
        listClass: "list",
      });

    }
  }, [pages2.length]);
 


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



  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (

    <>
      <AlternativeHeader comments={comments} fansonline={fansonline} postcoommentlikes={postcoommentlikes} totalpostclicks={totalpostclicks} postavengagement={postavengagement} postreach={postreach} oldpagefans={oldpagefans} postcountweek={postcountweek} oldengagement={oldengagement} oldimpressions={oldimpressions} followsweek={followsweek} impressions={impressions} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach2={fourteenreach2} fourteenreach={fourteenreach} pagename={pagename} name="Page Overview" parentName="Caucus" />
      <Container className="mt--6" fluid>
      <Row>
          
          <Col md="6" xl="3">
            
            <Card className="bg-gradient-info border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Combined Reactions
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                     {numeral(posts[0]?.reactions?.summary?.total_count).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-info border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Combined Reach
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                    {numeral(posts[0]?.comments?.summary?.total_count).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-info border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Combined Posts / Week
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      {numeral(posts[0]?.shares?.count).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-info border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Combined Ad Spend
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      {numeral(totalpostclicks[0].values[0].value).format('$0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
    
          <Col xl="8">

          <VectorMap
          containerClassName="vector-map"
          containerStyle={{
            width: "100%",
            height: "600px"
          }}
          map={"world_mill"}
          zoomOnScroll={true}
          scaleColors={["#f00", "#0071A4"]}
          normalizeFunction="polynomial"
          hoverOpacity={0.7}
          hoverColor={true}
          backgroundColor="transparent"
          regionStyle={{
            initial: {
              fill: "#e9ecef",
              "fill-opacity": 0.8,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 1
            },
            hover: {
              fill: "#dee2e6",
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "yellow"
            },
            selectedHover: {}
          }}
          markerStyle={{
            initial: {
              fill: "#fb6340",
              "stroke-width": 0
            },
            hover: {
              fill: "#11cdef",
              "stroke-width": 0
            }
          }}
          markers={[
            {
              latLng: [-37.81, 144.9],
              name: "Melbourne"
            },
            {
              latLng: [-38.1, 144.3],
              name: "Geelong"
            },
            {
              latLng: [-36.3, 145.4],
              name: "Shepparton"
            },
            {
              latLng: [-36.1, 144.7],
              name: "Echuca"
            },
            {
              latLng: [-37.5, 147.4],
              name: "Gippsland"
            },
   
          ]}
          series={{
            regions: [
              {
                values: mapData,
                scale: ["#ced4da", "#adb5bd"],
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />


            
          <Card>
            <CardHeader className="border-0">
              <h3 className="mb-0">Top Caucus Posts</h3>
            </CardHeader>
            <div className="table-responsive"  />
            <div className="table-responsive myTable3" ref={firstListRef2}>
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


          
          </Col>

          <Col lg="4">
          <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-1">Caucus Performance</h3>
                  </CardHeader>
                  <div className="table-responsive2" />
                  <div className="table-responsive myTable2" ref={firstListRef}>
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




                
            <Card className="bg-gradient-info">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Average Ad Spend
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                    $ 40.67
                    </span>
                  </div>
              
                </Row>
                <p className="mt-3 mb-0 text-sm">
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-info">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Average Cost Per Engagement
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                    $ 0.17
                    </span>
                  </div>
                 
                </Row>
                
                <p className="mt-3 mb-0 text-sm">
                </p>
              </CardBody>
            </Card>

            <Card className="bg-gradient-info">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      Top Overall Issue
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                    "Cost Blowout"
                    </span>
                  </div>
              
                </Row>
                
                <p className="mt-3 mb-0 text-sm">
                </p>
              </CardBody>
            </Card>
          
          </Col>

          

        </Row>
        <Row>
          <Col xl="8">
            <Row>
              <div className="col">
               
              </div>
            </Row>
            <div className="card-deck">

            </div>
          </Col>
          <Col xl="4">
         
          </Col>
        </Row>
        <Row>
          <Col xl="7">

          </Col>
        </Row>


       



        <div className="card-deck flex-column flex-xl-row">
          
         

        <Card>
            
            
            <CardHeader className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={pageimage?.url}

                  />

                </a>
                
                <div className="mx-2">
                  <a
                    className="text-dark font-weight-600 text-sm"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    {pagename} {posts[1]?.created_time?.slice(0, 10)}
                  </a>
                {posts[1].full_picture === undefined ? "" :  <small className="d-block text-muted">{posts[1]?.message?.slice(0,255)}...</small> }
                </div>
              </div>
             
            </CardHeader>

            <CardBody>
         
           {posts[1].full_picture === undefined ?  <h5 className="d-block text-muted">{posts[1]?.message}</h5> : "" }
           <p className="mb-0">

</p>
                
              
              <img
              
                className="img-fluid rounded postImage2"
                src={(`${posts[1]?.full_picture}`)}
              />
              
              <Row className="align-items-center my-3 pb-3 border-bottom">
                
                <Col sm="6">
                  <div className="icon-actions">
                    <a
                      className="like active"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="ni ni-like-2" 
                                      onClick={<UncontrolledPopover placement="top" target="tooltip876279349">
                                      <PopoverBody>
                                        This is a very beautiful popover, show some love.
                                      </PopoverBody>
                                    </UncontrolledPopover>}/>
                      <span className="text-muted">{numeral(posts[1]?.reactions?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-chat-round" />
                      <span className="text-muted">{numeral(posts[1]?.comments?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-curved-next" />
                      <span className="text-muted">{numeral(posts[1]?.shares?.count).format('0,0')}</span>
                    </a>
                  </div>
                </Col>

              </Row>

              <div className="mb-1">
                <Media className="media-comment">

                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-trophy" />
                    <span className="text-muted"></span>
                  </a>

                  <Media>
                    <div className="media-comment-text">
                      <h6 className="h5 mt-0"></h6>
                      <p className="text-sm lh-160">
                        {postcomment}
                        </p>
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">{numeral(postcoommentlikes).format('0,0')}</span>
                        </a>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                       
                          <span className="text-muted"></span>
                        </a>
                      </div>
                    </div>
                  </Media>
                </Media>
              </div>
            </CardBody>
         

          </Card>
          <Card>
            
            
            <CardHeader className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={pageimage?.url}

                  />

                </a>
                
                <div className="mx-2">
                  <a
                    className="text-dark font-weight-600 text-sm"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    {pagename} {posts[0]?.created_time?.slice(0, 10)}
                  </a>
                {posts[0].full_picture === undefined ? "" :  <small className="d-block text-muted">{posts[0]?.message?.slice(0,255)}...</small> }
                </div>
              </div>
             
            </CardHeader>

            <CardBody>
         
           {posts[0].full_picture === undefined ?  <h5 className="d-block text-muted">{posts[0]?.message}</h5> : "" }
           <p className="mb-0">

</p>
                
              
              <img
              
                className="img-fluid rounded postImage2"
                src={(`${posts[0]?.full_picture}`)}
              />
              
              <Row className="align-items-center my-3 pb-3 border-bottom">
                
                <Col sm="6">
                  <div className="icon-actions">
                    <a
                      className="like active"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="ni ni-like-2" 
                                      onClick={<UncontrolledPopover placement="top" target="tooltip876279349">
                                      <PopoverBody>
                                        This is a very beautiful popover, show some love.
                                      </PopoverBody>
                                    </UncontrolledPopover>}/>
                      <span className="text-muted">{numeral(posts[0]?.reactions?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-chat-round" />
                      <span className="text-muted">{numeral(posts[0]?.comments?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-curved-next" />
                      <span className="text-muted">{numeral(posts[0]?.shares?.count).format('0,0')}</span>
                    </a>
                  </div>
                </Col>

              </Row>

              <div className="mb-1">
                <Media className="media-comment">

                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-trophy" />
                    <span className="text-muted"></span>
                  </a>

                  <Media>
                    <div className="media-comment-text">
                      <h6 className="h5 mt-0"></h6>
                      <p className="text-sm lh-160">
                        {postcomment}
                        </p>
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">{numeral(postcoommentlikes).format('0,0')}</span>
                        </a>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                       
                          <span className="text-muted"></span>
                        </a>
                      </div>
                    </div>
                  </Media>
                </Media>
              </div>
            </CardBody>
         

          </Card>
          
          <Card>
            
            
            <CardHeader className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={pageimage?.url}

                  />

                </a>
                
                <div className="mx-2">
                  <a
                    className="text-dark font-weight-600 text-sm"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    {pagename} {posts[2]?.created_time?.slice(0, 10)}
                  </a>
                {posts[2].full_picture === undefined ? "" :  <small className="d-block text-muted">{posts[2]?.message?.slice(0,255)}...</small> }
                </div>
              </div>
             
            </CardHeader>

            <CardBody>
         
           {posts[2].full_picture === undefined ?  <h5 className="d-block text-muted">{posts[2]?.message}</h5> : "" }
           <p className="mb-0">

</p>
                
              
              <img
              
                className="img-fluid rounded postImage2"
                src={(`${posts[2]?.full_picture}`)}
              />
              
              <Row className="align-items-center my-3 pb-3 border-bottom">
                
                <Col sm="6">
                  <div className="icon-actions">
                    <a
                      className="like active"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="ni ni-like-2" />
                      <span className="text-muted">{numeral(posts[2]?.reactions?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-chat-round" />
                      <span className="text-muted">{numeral(posts[2]?.comments?.summary?.total_count).format('0,0')}</span>
                    </a>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-curved-next" />
                      <span className="text-muted">{numeral(posts[2]?.shares?.count).format('0,0')}</span>
                    </a>
                  </div>
                </Col>

              </Row>

              <div className="mb-1">
                <Media className="media-comment">

                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-trophy" />
                    <span className="text-muted"></span>
                  </a>

                  <Media>
                    <div className="media-comment-text">
                      <h6 className="h5 mt-0"></h6>
                      <p className="text-sm lh-160">
                        {postcomment}
                        </p>
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">{numeral(postcoommentlikes).format('0,0')}</span>
                        </a>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                       
                          <span className="text-muted"></span>
                        </a>
                      </div>
                    </div>
                  </Media>
                </Media>
              </div>
            </CardBody>
         

          </Card>
   

        </div>
       
        <Card className="bg-gradient-info">
              <CardBody>
                <Row className="justify-content-between align-items-center">
                  <div className="col">
                    <ReactWordcloud words={newWords} callbacks={callbacks} />
                  </div>
                </Row>
                
              </CardBody>
              
            </Card>
      </Container>
      
    </>
    
  );
}


export default Tables;
