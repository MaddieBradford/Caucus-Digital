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
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
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
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import "./Sortable.css";
import { useHistory } from "react-router";
import _, { create } from 'lodash';
var tz = require('moment-timezone');
var moment = require('moment');

const firebase = window.firebase;

function Sortable({ impressions, newfollows, engagement, reactions, totalreacts, oldpagefans, postcoommentlikes, postavengagement, postreach, totalpostclicks, postcomment, followers, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments }) {
  const [ranking, setRanking] = useState([]);
  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()

  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  const [pages2, setPages2] = useState([]);
  const [numerouno, setnumerouno] = useState([]);
  const [numerouno2, setnumerouno2] = useState([]);
  const [posts, setPosts] = useState([]);


  const firstListRef = useRef(null);

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("Pages").onSnapshot((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()).sort((a, b) => a.Reach > b.Reach ? -1 : 1));
    });
  }, [pages.length]);

  useEffect(() => {


    console.log("useEffect 18")
    db.collection("Pages").get().then((querySnapshot) => {
      setPages(querySnapshot.docs.map(d => d.data()).sort((a, b) => a.Reach > b.Reach ? -1 : 1));
    });

    (async () => {
      const postPages = (await db.collection("Page_Posts").get()).docs.map(p => ({ id: p.id }));
      let allPosts = await Promise.all(postPages.map(page => {
        return new Promise((resolve, reject) => {
          db.collection("Page_Posts").doc(page.id).collection('Posts').onSnapshot(resolve, reject);
        });
      }));
      allPosts = _.flatten(allPosts.map(post => post.docs.map(p => ({ ...p.data() }))))
      setPosts(allPosts)
    })();


    if (pages.length) {
      new List(firstListRef.current, {
        valueNames: ["PageName", "Engagement", "Followers", "PostsWeek"],
        listClass: "list",
      });

    }
  }, [pages.length]);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }



  const nearestThousand = value => {
    let rangeValue;
    switch (true) {
      case value == 0:
        rangeValue = 0;
        break;
      case value < 50:
        rangeValue = '< 50';
        break;
      case value < 100:
        rangeValue = '< 100';
        break;
      case value < 1000:
        rangeValue = '< 1000';
        break;
      case value < 3000:
        rangeValue = '< 3000';
        break;
      case value < 5000:
        rangeValue = '< 5000';
        break;
      case value < 7000:
        rangeValue = '< 7000';
        break;
      case value < 8000:
        rangeValue = '< 8000';
        break;
      case value < 10000:
        rangeValue = '< 10000';
    }
    const valStr = value.toString();
    const valStrLen = valStr.length - 1;
    const factor = Math.pow(10, valStrLen);

    return rangeValue === 0 ? rangeValue : (rangeValue || `< ${numeral(Math.round(value / factor) * factor).format('0,0')}`);
  }



  const postsWithPostreach = posts.filter(p => p.postreach);
  const postsWithReactions = posts.filter(p => p.reactions);
  const pagesWithFollowers = pages.filter(p => p.Followers);
  const pagesWithPostsWeek = pages.filter(p => p.PostsWeek);
  console.log('posss==>>', pages)

  const data_chart_donut = {
    options: {
      animation: {
        animateScale: false,
        animateRotate: true,
      },
    },
    labels: ['Labor', 'Liberal', 'Green', 'Independent'],
    datasets: [
      {

        data: [105, 154, 45, 27],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',

        ],
        borderWidth: 1,
        animation: false,
      },
    ],
  };

  const data_multi_axis = {
    labels: ['1', '2', '3', '4', '5', '6'],
    options: {
      animation: {
        animateScale: false,
        animateRotate: true,
      },
    },
    datasets: [
      {
        label: 'Daily Reach',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        //yAxisID: 'y-axis-1',
      },
      {
        label: 'Post Engagement',
        data: [1, 2, 1, 1, 2, 2],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        //yAxisID: 'y-axis-2',
      },
    ],
  };

  const options_2 = {
    maintainAspectRatio: false,
    animation: {
      animateScale: false,
      animateRotate: false,
    },
  }

  const options_multi_axis = {
    options: {
      animation: {
        animateScale: false,
        animateRotate: true,
      },
    },
    scales: {
      xAxes: [
        {

          gridLines: {
            lineWidth: 0,
            display: false,
            color: "rgba(0, 0, 0, 0)",
          }
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          // id: 'y-axis-1',
          gridLines: {
            drawOnArea: false,
            lineWidth: 0,
            display: false,
            color: "rgba(0, 0, 0, 0)",

          },
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          //id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
            lineWidth: 0,
            display: false,
            color: "rgba(0, 0, 0, 0)",

          },
        },
      ],
    },
  };


  chartExample4.data
    .labels = ["Labor", "Liberal", "Green", "Independent"]
  chartExample4.data.datasets[0].data = [105, 154, 45, 27]

  return (
    <>
      <SimpleHeader comments={comments} fansonline={fansonline} postcoommentlikes={postcoommentlikes} totalpostclicks={totalpostclicks} postavengagement={postavengagement} postreach={postreach} oldpagefans={oldpagefans} postcountweek={postcountweek} oldengagement={oldengagement} oldimpressions={oldimpressions} followsweek={followsweek} impressions={impressions} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach2={fourteenreach2} fourteenreach={fourteenreach} pagename={pagename} name="Leaderboard" parentName="Caucus" />


      <Container className="mt--6" fluid>
        <Row>


          <Row className="w-100 mx-0 mt-4">

            <Col md="6" xl="3">
              <Card className="bg-white border-0">
                <CardBody>

                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0 text-default"
                      >
                        Average Engagement
</CardTitle>
                      <span className="h2 font-weight-bold mb-0 text-muted text-default">
                        {numeral(postsWithReactions.reduce((a, b) => (a + parseFloat(b.reactions)), 0) / postsWithReactions.length).format('0,0')}

                      </span>

                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="3">
              <Card className="bg-white border-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0 text-default"
                      >
                        Average Reach
</CardTitle>
                      <span className="h2 font-weight-bold mb-0 text-muted text-default">
                        {console.log('postsWithPostreach==>>', postsWithPostreach)}
                        {numeral(postsWithPostreach.reduce((a, b) => (a + parseFloat(b.postreach)), 0) / postsWithPostreach.length).format('0,0')}
                      </span>

                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="3">
              <Card className="bg-white border-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0 text-default"
                      >
                        Average Page Likes
</CardTitle>
                      <span className="h2 font-weight-bold mb-0 text-muted text-default">
                        {numeral(pagesWithFollowers.reduce((a, b) => (a + parseFloat(b.Followers)), 0) / pagesWithFollowers.length).format('0,0')}
                      </span>

                    </div>
                  </Row>
                </CardBody>

              </Card>
            </Col>
            <Col md="6" xl="3">
              <Card className="bg-white border-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0 text-default"
                      >
                        Average Posts P/WEEK
</CardTitle>
                      <span className="h2 font-weight-bold mb-0 text-muted text-default">
                        {numeral(pagesWithPostsWeek.reduce((a, b) => (a + parseFloat(b.PostsWeek)), 0) / pagesWithPostsWeek.length).format('0,0')}
                      </span>

                    </div>
                  </Row>

                </CardBody>

              </Card>



            </Col>



          </Row>
          <div className="card-deck flex-column flex-xl-row marginremove">
            <Card className="chart custom265 ">


              <CardBody>


                <Doughnut data={data_chart_donut} options={options_2} />

              </CardBody>
            </Card>
            <Card className="chart custom265">

              <CardBody>
                <Line data={data_multi_axis} options={options_multi_axis} />

              </CardBody>
            </Card>
            <Card className="chart custom265">

              <CardBody>


                <Doughnut data={data_chart_donut} options={options_2} />


              </CardBody>
            </Card>

          </div>

          <Col lg="9" className="custom3">



            <Card>

              <CardHeader className="border-0 ">
                <h3 className="mb-1">Victorian MP's</h3>
              </CardHeader>

              <div className="table-responsive" />
              <div className="table-responsive" ref={firstListRef}>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th className="sort" data-sort="PageName" scope="col">
                        Name
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
                              <Progress max="10" value={page.PostsWeek} color="warning" />
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

          </Col>
          <Col>
            <Card className="custom2">

              <CardHeader className="border-0">
                <h3 className="mb-0">Coalition MP's</h3>
              </CardHeader>
              <div className="table-responsive " />
              <div className="table-responsive " ref={firstListRef}>
                <Table className="align-items-center table-flush" responsive>

                  <tbody className="list table-flush">
                    {pages.filter(p => ['Liberal', 'National'].includes(p.Party)).map((page, i) => (
                      <tr key={i} className="">

                        <td className="PageName " scope="row">

                          <Media className="align-items-center ">
                            <a
                              className="avatar rounded-circle mr-3 "
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
                        <td className="Engagement">
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">{(page.Engagement)}</span>
                          </Badge>
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </Table>

              </div>

            </Card>
            <Card className="custom2">

              <CardHeader className="border-0">
                <h3 className="mb-0">Crossbench</h3>
              </CardHeader>
              <div className="table-responsive " />
              <div className="table-responsive" ref={firstListRef}>
                <Table className="align-items-center table-flush" responsive>

                  <tbody className="list table-flush">
                    {pages.filter(p => ['Reason', 'Greens', 'Independent'].includes(p.Party)).map((page, i) => (
                      <tr key={i} className="">

                        <td className="PageName " scope="row">

                          <Media className="align-items-center ">
                            <a
                              className="avatar rounded-circle mr-3  "
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={page.PageImage}
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm ">{page.PageName}</span>
                            </Media>
                          </Media>
                        </td>
                        <td className="Engagement">
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">{(page.Engagement)}</span>
                          </Badge>
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>

          </Col>

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
