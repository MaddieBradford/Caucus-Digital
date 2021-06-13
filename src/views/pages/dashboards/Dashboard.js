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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardText,
  CardImg,
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
import OverflowWrapper from 'react-overflow-wrapper';

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
import Modals from "./Modals";
const firebase = window.firebase;
var moment = require('moment');
var tz = require('moment-timezone');

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
       { <img alt="..." src={require("assets/img/theme/right3.png").default}/>}
       </div>
  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
     { <img alt="..." src={require("assets/img/theme/left4.png").default}/>}
       </div>
  );
}


function Admin_Dashboard(props) {
  const { impressions, newfollows, engagement, totalreacts, AveragePostEngagement, ShareofVoice, Reach, TotalPostReach, AdPostEngagement, Engagement_Today, Engagement_7days, totalpostclicks, oldpagefans, postavengagement, postreach, postcomment, followers, posts, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments } = props;
  const [ranking, setRanking] = useState([]);
  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()
  const data2 = props.data
  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  const [pages2, setPages2] = useState([]);
  const [pages3, setPages3] = useState([]);
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

  useEffect(() => {

    console.log("useEffect 13")

    var date = moment().format('YYYY-MM-DD');
    var newYork = moment.tz(`${date} ${fansonline}:00:00`, "America/Los_Angeles");
    var AUD = newYork.clone().tz("Australia/Melbourne");
    setnumerouno(AUD.subtract(15, 'minutes').format('hh:mm A'));


    var newYork2 = moment.tz(`${date} ${fansonline2}:00:00`, "America/Los_Angeles");
    var AUD2 = newYork2.clone().tz("Australia/Melbourne");
    setnumerouno2(AUD2.subtract(15, 'minutes').format('hh:mm A'));
    // console.log("TIMEEEE2", `${date} ${fansonline2}:00:00:00`)



    db.collection("Page_Posts").doc(pagename).collection("Posts").get().then(function (querySnapshot) {
      setPages2(querySnapshot.docs.map(d => d.data()));

    });

    db.collection("Pages").get().then((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()));
    });


  }, [])


  

  useEffect(() => {
  

    if (pagename) {
      (async () => {
        try {
          /*let allCommentIds = await db.collection("Comments").get();
          allCommentIds = allCommentIds.docs.map(doc => doc.id);

          let allComments = await Promise.all(allCommentIds.map(async cId => {
            const comments = await db.collection("Comments").doc(pagename).collection('Comments').get();
            return comments.docs.map(doc => doc.data());
          }));
          allComments = _.flatten(allComments);*/

          const posts = await db.collection("Page_Posts").doc(pagename).collection('Posts').get();
          const allComments = _.flattenDeep(posts.docs.map(doc => doc.data().allcomments.map(c => decodeURI(c))));
          console.log('posts==>>', allComments)


          let words = await db.collection("Word_Cloud_Filter").doc('Words').get();
          words = words.data().Words.map(w => w.trim().toLowerCase());
          const textLegend = {};
          allComments.forEach(item => {
            item.split(' ').forEach(w => {
              w = w.trim().toLowerCase();
              textLegend[w] = (textLegend[w] || 0) + (words.includes(w) ? 1 : 0)
            });
          });
          const filteredTextLegend = {};
          Object.entries(textLegend).forEach(([k, v]) => {
            if (v) filteredTextLegend[k] = v;
          })
          setWordss(filteredTextLegend)
          //console.log('hey==**', filteredTextLegend)
        } catch (err) {
          //console.log('an err occured==**', err)
        }
      })();
    } else {
      //console.log('pagenmae not defind==**')
    }
  }, [])

  const newWords = Object.entries(wordss).map(([k, v]) => ({ text: k, value: v }));

  const callbacks = {
    getWordColor: word => word.value > 1 ? "rgba(54, 162, 235, 1)" : "rgba(54, 162, 235, 1)",
  }

  const wordoptions = {
    fontFamily: "vic",
    fontWeight: "bold",
  
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");

  };
  if (window.Chart) {
   
  }

  const firstListRef = useRef(null);
  useEffect(() => {
    console.log("useEffect 15")
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
    console.log("useEffect 16")
    if (pages2.length) {
      new List(firstListRef2.current, {
        valueNames: ["Type", "Date", "Reactions", "Shares", "Admin"],
        listClass: "list",
      });

    }
  }, [pages2.length]);



  let groups = Object.entries(age).map(([k, v]) => ({ group: k.split('.')[1], value: v }));
  groups = _.groupBy(groups, 'group');
  const groupedSum = _.sortBy(Object.entries(groups).map(([k, v]) => {
    return { age: k, sum: v.map(i => i.value).reduce((a, b) => a + b) }
  }), 'sum');
  console.log('age==>>', age, 'groupedSum==>>', groupedSum)
  chartExample2.data.labels = groupedSum.map(i => i.age);
  chartExample2.data.datasets[0].data = groupedSum.map(i => i.sum);


  let groups2 = Object.entries(age).map(([k, v]) => ({ group: k.split('.')[0], value: v }));
  groups2 = _.groupBy(groups2, 'group');
  const groupedSum2 = _.sortBy(Object.entries(groups2).map(([k, v]) => {
    return { gender: k, sum: v.map(i => i.value).reduce((a, b) => a + b) }
  }), 'sum');
  chartExample5.data.labels = groupedSum2.map(i => i.gender);
  chartExample5.data.datasets[0].data = groupedSum2.map(i => i.sum);
 // console.log("fffffg", posts)

  // AdPostEngagement
  // oldengagement[1]?.values[3]?.value < I just want this value
  // WHAT ELSE AFTER GETTING THW VALUE? - I just want the above two values displayed is all, to replace this data property?
  chartExample4.data
  .labels = ["Your Share", "Total Caucus Reach"]
  chartExample4.data.datasets[0].data = [1344, Reach]


  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const [show, setShow] = useState(false) 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalData, setModalData] = useState(null)

  const handleAddModalData = (getModalData) => {
    console.log('yooo****', getModalData)
    setModalData(getModalData)
  }
  
  
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (

    <>
      <CardsHeader comments={comments} AveragePostEngagement={AveragePostEngagement} TotalPostReach={TotalPostReach} ShareofVoice={ShareofVoice} fansonline={fansonline} AdPostEngagement={AdPostEngagement} totalpostclicks={totalpostclicks} postavengagement={postavengagement} postreach={postreach} oldpagefans={oldpagefans} postcountweek={postcountweek} oldengagement={oldengagement} oldimpressions={oldimpressions} followsweek={followsweek} impressions={impressions} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach2={fourteenreach2} fourteenreach={fourteenreach} pagename={pagename} name={pagename} parentName="Caucus" />
      <Container className="mt--6 " fluid>
        <Row>
          <Col xl="8" className="">
            {/* <div className="card-deck custom ml-0 mr-0"> */}
            <Slider {...settings}>
              {pages2.sort((a, b) => new Date(b.reactions) - new Date(a.reactions)).map(post2 => (
                  
                <Card className="maxh-478" style={{width: 260}}>
                     
                  <div className={`avatar-top ${post2.fullpicture ? "picturePresent" : "noPicture "}`}>
                    <a
                      className="avatar custom rounded-circle"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <img alt="..." src={post2.PageImage}/>
                    </a>
                   
                    <Button
                      type="button"
                      onClick={() => {
                        handleAddModalData(post2)
                        handleShow()
                      }}
                      className="custom-btn bg-white text-default"
                    >
                      <i className="ni ni-chart-bar-32" />
            </Button>
                  </div>
              

                  {post2.fullpicture && (
                    <div className="maxh-175">
                      <CardImg
                        alt="..."
                        src={post2.fullpicture}
                        top
                      />
                    </div>
                  )}



                  <CardBody>

                    <CardTitle>{pagename}</CardTitle>
                    <div className="d-flex align-items-center mb-3 mt-0">
                      <i className="ni ni-like-2 mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post2.reactions).format('0,0')}</p>
                      <i className="ni ni-curved-next mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post2.shares).format('0,0')}</p>
                      <i className="ni ni-chat-round mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post2.comments).format('0,0')}</p>
                    </div>
                    <div class="overflow-scroll maxh-235">
                      <CardText style={{ whiteSpace: 'pre-wrap' }}>

                        {decodeURI(post2?.message)}
                      </CardText>
                    </div>
                  </CardBody>
              
                 
                </Card>
                
              ))}
              </Slider>
            {/* </div> */}
            

            <Button className="btn-icon btn-2 cornerborder" color="white" type="button"  onClick={handleShow}>
          <span className="btn-inner--icon">
            <i className="ni text-default ni-send bg-:#1294ef" />
          </span>
        </Button>
        <Button className="btn-icon btn-2 cornerborder" color="white" type="button" onClick={logout} >
          <span className="btn-inner--icon">
            <i className="ni text-default ni-lock-circle-open bg-:#1294ef" />
          </span>
        </Button>
          </Col>

         
          <Col lg="4">
      
            <Card className="bg-gradient-white">

              <CardBody>
            
                <Row>
                
                  <div className="col">
                    <CardTitle className="text-uppercase mb-0 text-muted text-default">
                      Best Times to Post
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-muted text-default">
                      {numerouno} or {numerouno2}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-muted text--default rounded-circle shadow">
                      <i className="ni ni-time-alarm" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">

                  <span className="text-nowrap text-muted text-default">
                Based on your active followers
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-white">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-default">
                      Average Post Reach
                    </CardTitle>
                    <span className="h2 font-weight-bold text-muted mb-0 text-default">
                      {numeral(postreach).format('0,0')}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-muted text--default rounded-circle shadow">
                      <i className="ni ni-spaceship" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">

                  <span className="text-nowrap text-muted text-default">
                    Based on your recent posts
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-white">

              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 text-default">
                      Average post engagement
                    </CardTitle>
                    <span className="h2 font-weight-bold text-muted mb-0 text-default">
                      {numeral(AveragePostEngagement).format('0,0')}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-muted text--default rounded-circle shadow">
                      <i className="ni ni-controller" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">

                  <span className="text-nowrap text-muted text-default">
                    Based on your recent posts
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>




        </Row>
        <Row>
          <Col xl="8">

<Card>
           <CardHeader>
             <h5 className="h3 mb-0 ">{pagename + " " + "Reach"}</h5>
           </CardHeader>
           <CardBody>
             <div className="chart">
               <Line
                  data={chartExample1(fourteenreach)[chartExample1Data]}
                  options={chartExample1(fourteenreach).options}
                 id="chart-sales"
                 className="chart-canvas"
               />
             </div>
           </CardBody>
         </Card>
          </Col>
          <Col xl="4">
            <Card className="bg-gradient-white custom">
              <CardBody>
                <Row className="justify-content-between align-items-center h-100">
                  <div className="col heightword">
                    <ReactWordcloud words={newWords} callbacks={callbacks} options={wordoptions}/>
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
            <CardHeader className="bg-transparent">
              <h2 className="h3 mb-0">Share of Voice</h2>
            </CardHeader>
          
            <CardBody>
              <div className="chart">
                <Doughnut
                  data={chartExample4.data}
                  options={chartExample4.options}
                  className="chart-canvas"
                  id="chart-doughnut"
                />
              </div>

            </CardBody>
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
              <h5 className="h3 mb-0">Age Breakdown</h5>
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
   

      {modalData && <Modals handleClose={handleClose} show={show} handleShow={handleShow} modalData={modalData} />}
    </>
  );
}


export default Admin_Dashboard;
