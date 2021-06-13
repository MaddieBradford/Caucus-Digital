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
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import Modals3 from "./Modals3";
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
import { render } from "preact";
import { useHistory } from "react-router";
import classnames from "classnames";
import ReactWordcloud from 'react-wordcloud';
import "./Vector.css"
import numeral from "numeral";
import _, { create } from 'lodash';
var moment = require('moment');
var tz = require('moment-timezone');

var stringSimilarity = require("string-similarity");


const firebase = window.firebase;
const db = firebase.firestore();

function Vector(props) {
  const { impressions, newfollows, engagement, totalreacts, postcoommentlikes, totalpostclicks, oldpagefans, postavengagement, postreach, postcomment, followers, age, oldengagement, fansonline, fansonline2, oldimpressions, followsweek, pageimage, fourteenreach, postcountweek, fourteenreach2, pagename, comments } = props;
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
  const [posts, setPosts] = useState([]);
  const [postsCopy, setPostsCopy] = useState([]);
  const [selectedParty, setSelectedParty] = useState('');
  const [sortField, setSortField] = useState('dateField');
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (selectedParty) setPosts(postsCopy.filter(p => p.Party === selectedParty));
  }, [selectedParty]);

  useEffect(() => {
    if (searchTerm?.trim()) {
      setPosts(postsCopy.filter(r => r[r.textField]?.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setPosts(postsCopy);
    }
  }, [searchTerm]);  

  useEffect(() => {

    (async () => {
      try {
        const postPages = (await db.collection("Page_Posts").get()).docs.map(p => ({ id: p.id }));
        let allPosts = await Promise.all(postPages.map(page => {
          return new Promise((resolve, reject) => {
            db.collection("Page_Posts").doc(page.id).collection('Posts').onSnapshot(resolve, reject);
          });
        }));
        let allTweets = await Promise.all(postPages.map(page => {
          return new Promise((resolve, reject) => {
            db.collection("Page_Posts").doc(page.id).collection('Tweets').onSnapshot(resolve, reject);
          });
        }));
        let allAds = await Promise.all(postPages.map(page => {
          return new Promise((resolve, reject) => {
            db.collection("Page_Posts").doc(page.id).collection('Ads').onSnapshot(resolve, reject);
          });
        }));

        let fetchedPages = await db.collection("Pages").get();
        fetchedPages = fetchedPages.docs.map(d => d.data()).sort((a, b) => a.Reach > b.Reach ? -1 : 1);

        allPosts = _.flatten(allPosts.map(post => post.docs.map(p => ({ ...p.data() })))).map(r => ({...r, textField: 'message', dateField: 'created_time', reactionsField: 'reactions'}));
        allTweets = _.flatten(allTweets.map(tweet => tweet.docs.map(p => ({ ...p.data() })))).map(r => ({...r, textField: 'full_text', dateField: 'created_at', reactionsField: 'retweet_count'}));
        allAds = _.flatten(allAds.map(ad => ad.docs.map(p => ({ ...p.data() })))).map(r => ({...r, page: fetchedPages.find(p => p.PageName === r.page_name), textField: 'ad_creative_body', dateField: 'ad_delivery_start_time', reactionsField: 'impressions.upper_bound'}));
        const allRecords = [...allPosts, ...allTweets, ...allAds];
        setPosts(allRecords);
        setPostsCopy(allRecords);
        allPosts.forEach(post => {
          const similarity = stringSimilarity.compareTwoStrings("Ever wanted to dig a really big hole? Now you can, Metro Tunnel style.The Melbourne Museum's", "Ever wanted to dig a really big hole? Now you can, Metro Tunnel style.The Melbourne Museum's");
          console.log("useEffect 17****", similarity);
        });
        
      } catch (err) {
        console.log('an error occuured==>>', err);
      }
    })();
  }, []);

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalData, setModalData] = useState(null)

  const handleAddModalData = (getModalData) => {
    setModalData(getModalData)
  }

  console.log('yooo sortField****', posts.filter(p => p.textField === 'ad_creative_body'))

  console.log("allPosts****", posts.sort((a, b) => {
    //return sortField === 'dateField' ? (new Date(b[sortField]) > new Date(a[sortField]) ? 1 : -1) : (b[sortField] > a[sortField] ? 1 : -1);
    console.log('new Date(b[sortField])', b[b[sortField]], 'new Date(a[sortField])', a['sortField'], 'sortField', sortField)
    return new Date(b[sortField]) > new Date(a[sortField]) ? 1 : -1;
  }));

  return (
    <>
      <AlternativeHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} setSortField={setSortField} setSelectedParty={setSelectedParty} comments={comments} fansonline={fansonline} postcoommentlikes={postcoommentlikes} totalpostclicks={totalpostclicks} postavengagement={postavengagement} postreach={postreach} oldpagefans={oldpagefans} postcountweek={postcountweek} oldengagement={oldengagement} oldimpressions={oldimpressions} followsweek={followsweek} impressions={impressions} postcomment={postcomment} newfollows={newfollows} engagement={engagement} followers={followers} posts={posts} pageimage={pageimage} fourteenreach2={fourteenreach2} fourteenreach={fourteenreach} pagename={pagename} name="Vector maps" parentName="Caucus" />
      <Container className="mt--6" fluid>
{/*  
        <Row>

          <Col md="6" xl="3">
            <Card className="bg-default border-0">
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
                      {numeral(posts.reduce((a, b) => (a + parseFloat(b.reactions)), 0) / posts.length).format('0,0')}

                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-default border-0">
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
                      {numeral(posts.reduce((a, b) => (a + parseFloat(b.postreach)), 0) / posts.length).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-default border-0">
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
                      {numeral(pages.reduce((a, b) => (a + parseFloat(b.Followers)), 0) / pages.length).format('0,0')}
                    </span>

                  </div>
                </Row>
              </CardBody>

            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-default border-0">
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
                      {numeral(pages.reduce((a, b) => (a + parseFloat(b.PostsWeek)), 0) / pages.length).format('0,0')}
                    </span>

                  </div>
                </Row>

              </CardBody>

            </Card>



          </Col>



        </Row>
*/}
        <div className="card-columns">



          {posts.filter(post => !filter || (filter === 'twitter' ? post.created_at : (filter === 'facebook' ? post.created_time : post.ad_delivery_start_time)))
          .sort((a, b) => {
            return sortField === 'dateField' ? (new Date(b[b[sortField]]) > new Date(a[a[sortField]]) ? 1 : -1) : (b[b[sortField]] > a[a[sortField]] ? 1 : -1);
          }).map(post => (
            <> 
              {post.created_at ?
              //Tweet
                (<Card>
                  
                  <div className={`avatar-group avatar-top d-block ${post.entities?.media?.[0]?.media_url ? "picturePresent" : "noPicture"}`}>
                    <a
                      className="avatar custom rounded-circle"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <img alt="..." src={post.user.profile_image_url} onClick={() => {
                        handleAddModalData(post)
                        handleShow()
                      }} />
                    </a>
                    <a
            className="avatar rounded-circle bg-blue"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/theme/Twitter3.png").default} />
          </a>


                  </div>

                  {post.entities?.media?.[0]?.media_url && (
                    <CardImg
                      alt="..."
                      src={post.entities?.media?.[0]?.media_url}
                      top
                    />
                  )}

                  <CardBody>
                    <CardTitle className="custom-card-title">{post.user.name}</CardTitle>
                    <p className="card-date mb-0 mr-2">@{post.user.screen_name}</p>
                    <div className="d-flex align-items-center mb-3 mt-2">
                      <i className="ni ni-active-40 mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.favorite_count).format('0,0')}</p>
                      <i className="ni ni-chat-round mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.retweet_count).format('0,0')}</p>
                    </div>
                    <CardText style={{ whiteSpace: 'pre-wrap' }}>
                      {post?.full_text}
                    </CardText>
                  </CardBody>
                </Card>)
                :
                //Post
                post.created_time ? 
                (<Card>
                 
                  <div className={`avatar-group avatar-top d-block ${post.fullpicture ? "picturePresent" : "noPicture"}`}>
                    <a
                      className="avatar custom rounded-circle"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <img alt="..." src={post.PageImage} onClick={() => {
                        handleAddModalData(post)
                        handleShow()
                      }} />
                    </a>
                    <a
            className="avatar rounded-circle bg-blue"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/theme/Facebook2.png").default} />
          </a>
                  </div>

                  {post.fullpicture && (
                    
                    <CardImg
                      alt="..."
                      
                      src={post.fullpicture}
                      top
                    />
                  )}

                  <CardBody>
                    <CardTitle className="custom-card-title">{post.pagename}</CardTitle>
                    <div className="d-flex align-items-center mb-3 mt-2">
                      <i className="ni ni-like-2 mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.reactions).format('0,0')}</p>
                      <i className="ni ni-curved-next mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.shares).format('0,0')}</p>
                      <i className="ni ni-chat-round mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.comments).format('0,0')}</p>
                    </div>
                    <CardText style={{ whiteSpace: 'pre-wrap' }}>
                      {post.message === 'undefined' ? '' : decodeURI(post?.message)}
                    </CardText>
                  </CardBody>
                </Card>)
                :
                //Ad
                (<Card>
                 
                  <div className={`avatar-group avatar-top d-block ${post.adImage ? "picturePresent" : "noPicture"}`}>
                    <a
                      className="avatar custom rounded-circle"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <img alt="..." src={post.PageImage || post.page?.PageImage} onClick={() => {
                        handleAddModalData(post)
                        handleShow()
                      }} />
                    </a>
                    <a
            className="avatar rounded-circle bg-blue"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/theme/Facebook2.png").default} />
          </a>
                  </div>

                  {post.adImage && (
                    <CardImg
                      alt="..."
                      src={post.adImage}
                      top
                    />
                  )}

                  <CardBody>
                    <CardTitle className="custom-card-title mb-2">{post.page_name}</CardTitle>
                    <p className="card-date mb-0 mr-2 h1">Impressions: {numeral(post.impressions.lower_bound).format('0,0')} - {numeral(post.impressions.upper_bound).format('0,0')}</p>
                    <p className="card-date mb-2 mr-2 h1">Money Spent: ${numeral(post.spend.lower_bound).format('0,0')} - ${numeral(post.spend.upper_bound).format('0,0')}</p>
                    {/* <div className="d-flex align-items-center mb-3 mt-2">
                      <i className="ni ni-like-2 mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.reactions).format('0,0')}</p>
                      <i className="ni ni-curved-next mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.shares).format('0,0')}</p>
                      <i className="ni ni-chat-round mr-1" />
                      <p className="card-date mb-0 mr-2">{numeral(post.comments).format('0,0')}</p>
                    </div> */}
                    <CardText style={{ whiteSpace: 'pre-wrap' }}>
                   
                      {post.ad_creative_body === 'undefined' ? '' : post?.ad_creative_body}
                    </CardText>
                  </CardBody>
                </Card>)                
                }
            </>
          ))}
        </div>

      </Container>
      {modalData && <Modals3 handleClose={handleClose} show={show} handleShow={handleShow} modalData={modalData} />}
    </>
  );
}

export default Vector;
