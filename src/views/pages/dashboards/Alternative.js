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
// react plugin for creating vector maps
// javascipt plugin for creating charts
import Chart from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// react plugin used to create charts
import ReactWordcloud from 'react-wordcloud';
import numeral from "numeral";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Form,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  ListGroupItem,
  ListGroup,
  Media,
  PopoverBody, 
  UncontrolledPopover,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

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
import {capitalizeFirstLetter} from '../../../utils';
import './Alternative.css'

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


const clock = (15 - 24)


const firebase = window.firebase;

function Alternative(props) {
  const { impressions, newfollows, engagement, postcomment, totalpostclicks, postreach, postcoommentlikes, followers, posts, pageimage, fourteenreach, pagename, comments, totalreacts } = props;
  const [wordss, setWordss] = React.useState({});
  const [posticon, setposticon] = useState([]);
  const [posts2, setPosts] = useState([]);
  const newWords = Object.entries(wordss).map(([k, v]) => ({ text: k, value: v }));
  const db = firebase.firestore();
  const size = [800, 400];
  const callbacks = {
    getWordColor: word => word.value > 1 ? "white" : "white",
  }

  console.log(posts[5]?.full_picture, "<==== this is the posts")

  const vals = Object.entries(totalreacts[0]?.values[0]?.value).map(([k,v]) => ({label: k, value: v}));
  chartExample6.data.labels = vals.map(v => capitalizeFirstLetter(v.label));
  chartExample6.data.datasets[0].data = vals.map(v => v.value);
  
  useEffect(() => {
    console.log("useEffect 11")
   
    if (pagename) {
      (async () => {
        try {
          let comments = await db.collection("Comments").doc(pagename).collection('Comments').get();
          comments = comments.docs.map(doc => doc.data());
          let words = await db.collection("Word_Cloud_Filter").doc('Words').get();
          words = words.data().Words.map(w => w.trim().toLowerCase());
         
          const textLegend = {};
          comments.forEach(item => {
            item.comment.split(' ').forEach(w => {
              w = w.trim().toLowerCase();
              textLegend[w] = (textLegend[w] || 0) + (words.includes(w) ? 1 : 0)
            });
          });
          const filteredTextLegend = {};
          Object.entries(textLegend).forEach(([k, v]) => {
            if (v) filteredTextLegend[k] = v;
          })
          setWordss(filteredTextLegend)
  
       
        } catch(err) {
         // console.log('an error occured==**', err)
        }
      })();
    } else {
     // console.log('pagenmae not defind==**')
    }
  }, [])

  React.useEffect(() => {
    console.log("useEffect 12")

if (posts[0]?.icon?.includes('photo')) {

  setposticon("ni ni-image");

} else if (posts[0]?.icon?.includes('video')) {

  setposticon("ni ni-button-play");

} else {

  setposticon("ni ni-caps-small");

}


    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  useEffect(() => {
  

    (async() => {
      const getPosts = await db.collection("Page_Posts").doc(pagename).collection('Posts').get();
      setPosts(getPosts.docs.map(p => ({...p.data()})));
      console.log("dddddf", getPosts.docs)
    })();
  }, []);

  return (
    <>
      <AlternativeHeader comments={comments} impressions={impressions} totalpostclicks={totalpostclicks} postcoommentlikes={postcoommentlikes} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach={fourteenreach} pagename={pagename} name="Social2 Dashboard" parentName="Caucus" />
      
      <Container className="mt--6" fluid>
        
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
                      Reactions
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
                      Comments
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
            <Card className="bg-gradient-danger border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Shares
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
            <Card className="bg-gradient-default border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Reach
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      {numeral(totalpostclicks[0].values[0].value).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <div className="card-deck dog flex-column flex-xl-row">


          
          <Card>
           <CardHeader>
             <h5 className="h3 mb-0">Reaction Review</h5>
           </CardHeader>
           <CardBody>
             <div className="chart">
               <Bar
                 data={chartExample6.data}
                 options={chartExample6.options}
                 className="chart-canvas"
                 id="chart-bars2"
               />
             </div>
             




             
           </CardBody>
            <CardHeader className="bg-transparent">
              <h6 className="text-muted text-uppercase ls-1 mb-4"></h6>
              <h2 className="h3 mb-2">Post Specific Comments</h2>
            </CardHeader>
            <Card className="bg-gradient-default">
              <CardBody>
                <Row className="justify-content-between align-items-center">
                  <div className="col">
                    <ReactWordcloud words={newWords} callbacks={callbacks} />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Card>
         
          <Card>




            
        <div className="img-wrapper">
        <div className={`avatar-top ${posts[0].full_picture ? "picturePresent" : "noPicture"}`}>
            <a
          className="avatar custom rounded-circle"
          href="#pablo"
          onClick={e => e.preventDefault()}
        >
         <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
              
              <i className={posticon} /> 
            </div>
        </a>
        </div>
    
    {posts[0].full_picture && (
      <CardImg
      alt="..."
      src={posts[0].full_picture}
      top
    />
    )}
            </div>
            <CardBody>
              <CardTitle>
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
                  
              </CardTitle>
              <div className="textWrapper">
              <CardText>
              {posts[7]?.message}
              </CardText>
              </div>
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
              {/* <CardText>
              <small className="text-muted">{posts[0]?.created_time}</small>
              </CardText> */}
            </CardBody>
            
          </Card>













        </div>
        <Row>
          {/*<Col xl="8">
             <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="name" scope="col">
                      Project
                    </th>
                    <th className="sort" data-sort="budget" scope="col">
                      Budget
                    </th>
                    <th className="sort" data-sort="status" scope="col">
                      Status
                    </th>
                    <th scope="col">Users</th>
                    <th className="sort" data-sort="completion" scope="col">
                      Completion
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("assets/img/theme/bootstrap.jpg").default
                            }
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2500 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-warning" />
                        <span className="status">pending</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip133563378"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip133563378"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip336932279"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip336932279"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip619079522"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip619079522"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip432104658"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip432104658"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">60%</span>
                        <div>
                          <Progress max="100" value="300" color="warning" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("assets/img/theme/angular.jpg").default
                            }
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$1800 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip634319950"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip634319950"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip493477456"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip493477456"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip556499717"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip556499717"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip106307927"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip106307927"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/sketch.jpg").default}
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            Black Dashboard
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$3150 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-danger" />
                        <span className="status">delayed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip389668727"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip389668727"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip477178747"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip477178747"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip927225283"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip927225283"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip394856270"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip394856270"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">72%</span>
                        <div>
                          <Progress max="100" value="72" color="danger" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/react.jpg").default}
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            React Material Dashboard
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$4400 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-info" />
                        <span className="status">on schedule</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip51649841"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip51649841">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip85562388"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip85562388">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip195204481"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip195204481"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip967941406"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip967941406"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">90%</span>
                        <div>
                          <Progress max="100" value="90" color="info" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/vue.jpg").default}
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            Vue Paper UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2200 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip177298166"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip177298166"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip290379011"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip290379011"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip2287293"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip2287293">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip539852250"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip539852250"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("assets/img/theme/bootstrap.jpg").default
                            }
                          />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2500 USD</td>
                    <td>
                      <Badge className="badge-dot mr-4" color="">
                        <i className="bg-warning" />
                        <span className="status">pending</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip758997307"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip758997307"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip597292977"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip597292977"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip443183509"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip443183509"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm rounded-circle"
                          href="#pablo"
                          id="tooltip806450131"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip806450131"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">60%</span>
                        <div>
                          <Progress max="100" value="60" color="warning" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color=""
                          size="sm"
                          className="btn-icon-only text-light"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card> 
          </Col>*/}
          <Col xl="4">
            {/* <Card className="widget-calendar">
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h5 className="h3 mb-0">Real time</h5>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Action
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <VectorMap
                  containerClassName="vector-map vector-map-sm"
                  containerStyle={{
                    width: "100%",
                    height: "280px",
                  }}
                  map={"world_mill"}
                  zoomOnScroll={false}
                  scaleColors={["#f00", "#0071A4"]}
                  normalizeFunction="polynomial"
                  hoverOpacity={0.7}
                  hoverColor={false}
                  backgroundColor="transparent"
                  regionStyle={{
                    initial: {
                      fill: "#e9ecef",
                      "fill-opacity": 0.8,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 1,
                    },
                    hover: {
                      fill: "#dee2e6",
                      "fill-opacity": 0.8,
                      cursor: "pointer",
                    },
                    selected: {
                      fill: "yellow",
                    },
                    selectedHover: {},
                  }}
                  markerStyle={{
                    initial: {
                      fill: "#fb6340",
                      "stroke-width": 0,
                    },
                    hover: {
                      fill: "#11cdef",
                      "stroke-width": 0,
                    },
                  }}
                  markers={[
                    {
                      latLng: [41.9, 12.45],
                      name: "Vatican City",
                    },
                    {
                      latLng: [43.73, 7.41],
                      name: "Monaco",
                    },
                    {
                      latLng: [35.88, 14.5],
                      name: "Malta",
                    },
                    {
                      latLng: [1.3, 103.8],
                      name: "Singapore",
                    },
                    {
                      latLng: [1.46, 173.03],
                      name: "Kiribati",
                    },
                    {
                      latLng: [-21.13, -175.2],
                      name: "Tonga",
                    },
                    {
                      latLng: [15.3, -61.38],
                      name: "Dominica",
                    },
                    {
                      latLng: [-20.2, 57.5],
                      name: "Mauritius",
                    },
                    {
                      latLng: [26.02, 50.55],
                      name: "Bahrain",
                    },
                  ]}
                  series={{
                    regions: [
                      {
                        values: mapData,
                        scale: ["#ced4da", "#adb5bd"],
                        normalizeFunction: "polynomial",
                      },
                    ],
                  }}
                />
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/icons/flags/US.png").default}
                        />
                      </Col>
                      <div className="col">
                        <small>Country:</small>
                        <h5 className="mb-0">United States</h5>
                      </div>
                      <div className="col">
                        <small>Visits:</small>
                        <h5 className="mb-0">2500</h5>
                      </div>
                      <div className="col">
                        <small>Bounce:</small>
                        <h5 className="mb-0">30%</h5>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/icons/flags/DE.png").default}
                        />
                      </Col>
                      <div className="col">
                        <small>Country:</small>
                        <h5 className="mb-0">Germany</h5>
                      </div>
                      <div className="col">
                        <small>Visits:</small>
                        <h5 className="mb-0">2500</h5>
                      </div>
                      <div className="col">
                        <small>Bounce:</small>
                        <h5 className="mb-0">30%</h5>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/icons/flags/GB.png").default}
                        />
                      </Col>
                      <div className="col">
                        <small>Country:</small>
                        <h5 className="mb-0">Great Britain</h5>
                      </div>
                      <div className="col">
                        <small>Visits:</small>
                        <h5 className="mb-0">2500</h5>
                      </div>
                      <div className="col">
                        <small>Bounce:</small>
                        <h5 className="mb-0">30%</h5>
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card> */}
          </Col>
        </Row>
       
      </Container>
    </>
  );
}

export default Alternative;
