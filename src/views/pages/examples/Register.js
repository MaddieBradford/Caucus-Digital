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
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// import firebase from "firebase/app";

// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// reactstrap components
// 1 sec
// import {promisify} from 'util';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  ListGroupItem,
  ListGroup,
  Input,
  InputGroupAddon,
  CardTitle,
  CardText,
  InputGroupText,
  InputGroup,
  Container,
  Modal,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
//import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";

const { FB } = require('fb');
const firebase = window.firebase;
const db = firebase.firestore();

/*if (!db) {
  firebase.initializeApp({
    apiKey: "AIzaSyA3S6G0FJy5qCovuRMFuTfzpvRqg3yxwxY",
    authDomain: "caucus-17dce.firebaseapp.com",
    projectId: "caucus-17dce",
    storageBucket: "caucus-17dce.appspot.com",
    messagingSenderId: "398082497668",
    appId: "1:398082497668:web:cb111790ec85b9ceb4b6d1",
    measurementId: "G-8HF9VCWGDM"
  });
  db = firebase.firestore();
}*/

// const fbPromises = {};
// Object.entries(window.FB).forEach(([k,v]) => {
//   if (typeof v === 'function') fbPromises[k] = promisify(v)
// });


function Register({ history }, props) {

  // Add a new document in collection "cities" with ID 'LA'

  const [focusedName, setfocusedName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [useremail, setUserEmail] = React.useState(null);
  const [userpassword, setUserPassword] = React.useState({});
  const [accountslist, setAccountsList] = useState([]);
  const [defaultModal, setdefaultModal] = React.useState(false);
  const [notificationModal, setnotificationModal] = React.useState(false);
  const [formModal, setformModal] = React.useState(false);
  const [User_Access_Token, setUser_Access_Token] = useState([]);
  const [Page_Access_Token, setPage_Access_Token] = useState([]);
  const firebase = window.firebase;
  const db = firebase.firestore();
  var moment = require('moment');
  var previousweek = moment().subtract('days', 7).format('MM/DD/YYYY')
  let newDate = new Date()

  const Signup = e => {
    e.preventDefault();
    const { email, password } = formValues;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        setUserEmail(email);
        setUserPassword(password);
        console.log('Registration: User Has Signed Into Firebase, Attempting Facebook Authentication');
        FacebookAuthenticate();
      })
  }

  async function FacebookAuthenticate(isMounted) {
    window.FB.login(async function (response) {
      if (response.authResponse) {
        const { accessToken, userID } = response.authResponse;
        const auth = (await db.collection('AuthSettings').doc('auth').get()).data();
        const appId = auth['app-id'];
        const appSecret = auth['app-secret'];
        try {
          const resp = await FB.api(
            `oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${accessToken}`,
            'GET')
            console.log("respiii",resp);
          const { access_token } = resp;
          
          setUser_Access_Token(access_token);
          const accountsResp = await FB.api(`${userID}/accounts?access_token=${access_token}"`, 'GET');
          setAccountsList(JSON.parse(JSON.stringify(accountsResp.data)));
          setformModal(true);
        } catch (err) {
          console.log('Registration: Facebook Authentication Error', err);
        }
      } else {
        console.log('Registration: User did not fully authorize access.');
        history.push('/auth/register')
      }

    }, { scope: 'email, pages_manage_cta, pages_manage_posts, pages_read_user_content, pages_show_list, public_profile, pages_manage_engagement, pages_read_engagement, read_insights, pages_manage_ads, ads_read' })
  }

  const SetAccessToken = async account => {
    await db.collection("Users").doc(useremail).set({
      Page_Token: account.access_token,
      Page_ID: account.id,
      Page_Name: account.name,
      User_Token: User_Access_Token,
      Email: useremail,
    });
    console.log('Registration: User Profile Established');

    const newPageName = account.name;
    const PageID = account.id;
    const Page_Access_Token = account.access_token;


    let response = await FB.api(`${PageID}/insights/page_fans_online`, 'GET', { access_token: Page_Access_Token });
    const values = Object.values(response?.data[0]?.values[1]?.value);
    const myVal = values.indexOf(Math.max(...values))
    var arr = values;
    var max = Math.max.apply(null, arr); // get the max of the array
    arr.splice(arr.indexOf(max), 1); // remove max from the array
    const secondVal = Math.max.apply(null, arr)
    const secondValIndex = values.indexOf(secondVal)
    let fansOnline;
    if (myVal < 10) {
      fansOnline = '0' + myVal;
    } else {
      fansOnline = myVal;
    }
    let fansOnline2;
    if (secondValIndex < 10) {
      fansOnline2 = '0' + secondValIndex
    } else {
      fansOnline2 = myVal;
    }

    let Engagement = await FB.api(`${PageID}/insights/page_post_engagements,page_fan_adds_unique?date_preset=last_7d`, 'GET', { access_token: Page_Access_Token }); Engagement = Engagement?.data;
    let newFollowers = await FB.api(`${PageID}/?fields=fan_count`, 'GET', { access_token: Page_Access_Token }); newFollowers = newFollowers?.fan_count;
    let oldPageFans = await FB.api(`${PageID}/insights/page_fan_adds_unique?date_preset=last_7d`, 'GET', { access_token: Page_Access_Token }); oldPageFans = oldPageFans?.data;
    let response5 = await FB.api(`${PageID}/posts?fields=insights.metric(post_impressions_unique, post_clicks_unique)&limit=40`, 'GET', { access_token: Page_Access_Token });

    const postReach = response5.data.map(t => t?.insights?.data[0]?.values[0]?.value);
    const postEngagement = response5.data.map(t => t?.insights?.data[1]?.values[0]?.value);
    const avePostReach = postReach.reduce((a, b) => a + b) / response5?.data?.length;
    const avePostEngagement = postEngagement.reduce((a, b) => a + b) / response5?.data?.length;

    let fourteenReach = await FB.api(`${PageID}/insights/page_posts_impressions_unique?&date_preset=last_30d`, 'GET', { access_token: Page_Access_Token }); fourteenReach = fourteenReach?.data[0].values;
    let impress6 = await FB.api(`${PageID}/insights/page_posts_impressions_organic_unique?total_count&since=${previousweek}`, 'GET', { access_token: Page_Access_Token }); impress6 = impress6?.data;
    let pageimage2 = await FB.api(`${PageID}/picture?redirect=false`, 'GET', { access_token: Page_Access_Token }); pageimage2 = pageimage2?.data;
    let impress9 = await FB.api(`${PageID}/insights/page_fans_gender_age`, 'GET', { access_token: Page_Access_Token }); impress9 = impress9?.data[0]?.values[1]?.value;
    let impress99 = await FB.api(`${PageID}/published_posts?summary=total_count&since=${previousweek}`, 'GET', { access_token: Page_Access_Token }); impress99 = response;

    db.collection("Pages").doc(newPageName).set({
      PostsWeek: impress99.summary?.total_count || 0,
      FanDemographics: impress9 || {},
      fourteenReach: fourteenReach || [],
      Engagement_Today: Engagement[0]?.values[6]?.value || 0,
      Engagement_7days: Engagement[0]?.values[0]?.value || 0,
      Reach: impress6[1]?.values[3]?.value || 0,
      OldReach: impress6[1]?.values[0]?.value || 0,
      Fans_Today: Engagement[1]?.values[6]?.value || 0,
      Fans_7days: Engagement[1]?.values[0]?.value || 0,
      Followers: newFollowers || 0,
      AveragePostReach: avePostReach || 0,
      AverageEngagement: avePostEngagement || 0,
      FansOnline1: fansOnline || 0,
      FansOnline2: fansOnline2 || 0,
      PageImage: pageimage2?.url || '',
      PageName: newPageName || '',
      Page_Access_Token: Page_Access_Token || '',
      Party: "Labor",
      PageID: PageID || '',
    }, { merge: true });
    console.log('Registration: Page Fully Created');

    window.FB.api(
      `${account.id}/posts?fields=id,permalink_url,message,message_tags,created_time,admin_creator,from,full_picture,icon,shares,comments.limit(20).summary(total_count){message,id,like_count},insights.metric(post_impressions_unique,post_engaged_users,post_reactions_by_type_total),reactions.summary(total_count)&limit=20`, 'GET', { access_token: account.access_token },

      async function (response) {
        const Posts = response?.data
        await Promise.allSettled(Posts.map(async post => {
          const PostsRef = db.collection("Page_Posts").doc(account.name).collection('Posts');
          const PostDoc = await db.collection("Pages").doc(account.name).get();
          const doc = await PostsRef.where('id', '==', post.id).get();

          if (!doc.docs.length) {
            const PagePost = await db.collection("Page_Posts").doc(account.name).get();
            if (!PagePost.exists) {
              await db.collection("Page_Posts").doc(account.name).set({
                accountName: account.name
              }, { merge: true })
            }

            return PostsRef.add({
              id: post?.id || '',
              fullpicture: post?.full_picture || '',
              PageImage: PostDoc.data()?.PageImage || '',
              reactiontypes: Object.entries(post?.insights?.data[2]?.values[0].value).map(([k, v]) => ({ label: k, value: v })),
              //reachstamp: post?.insights?.data[0]?.values[0]?.value || [],
              icon: post?.icon || '',
              pagename: account.name || '',
              PageAccessToken: Page_Access_Token || '',
              created_time: post?.created_time || '',
              admin_creator: post?.admin_creator?.name || '',
              reactions: post?.reactions?.summary?.total_count || 0,
              shares: post?.shares?.count || 0,
              allcomments: post?.comments?.data.map(comment => encodeURI(comment.message)) || [],
              taggedprofiles: post?.message_tags?.map(tagged => tagged.name) || [],
              comments: post?.comments?.summary?.total_count || 0,
              topcomment: encodeURI(post?.comments?.data[0]?.message) || '',
              topcommentlikes: post?.comments?.data[0]?.like_count || '',
              topcommentreplies: post?.comments?.data[0]?.comment_count || '',
              postreach: post?.insights?.data[0]?.values[0]?.value || 0,
              postengagement: post?.insights?.data[1]?.values[0]?.value || 0,
              postreach: post?.insights?.data[0]?.values[0]?.value || 0,
              postengagement: post?.insights?.data[1]?.values[0]?.value || 0,
              message: encodeURI(post?.message) || '',
              url: post?.permalink_url || '',
              Party: PostDoc.data()?.Party || ''

            })
          }
        }));
        setformModal(false);
        console.log('Registration: Complete - Loading Dashboard');
        history.push('/Admin')
      });
  }

  const handleInputChange = e => setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCheckBoxChange = e => setFormValues(prev => ({ ...prev, [e.target.name]: e.target.checked }));

  return (
    
    <>
      <AuthHeader
        title="Create an account"
        lead=""
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up and authorise your Facebook Account</small>
                </div>
                <Form onSubmit={Signup} role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        required
                        onChange={handleInputChange}
                        value={formValues.name || ''}
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        onChange={handleInputChange}
                        value={formValues.email || ''}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        onChange={handleInputChange}
                        value={formValues.password || ''}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          name="agree"
                          required
                          onChange={handleCheckBoxChange}
                          checked={formValues.agree}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="submit">

                      <span className="btn-inner--icon mr-1">
                        <i className="fab fa-facebook" />
                      </span>
                      <span className="btn-inner--text">Register with Facebook</span>
                    </Button>

                    <Modal
                      className="modal-dialog-centered"
                      size="sm"
                      isOpen={formModal}
                      toggle={() => setformModal(prev => !prev)}
                    >
                      <div className="modal-body p-0">
                        <Card className="bg-secondary border-0 mb-0">
                          <CardHeader className="bg-transparent">
                            <div className="h2 font-weight-bold text-center mt-1 mb-0 ">
                              <small>Select Your Primary Page</small>
                            </div>
                            <div className="btn-wrapper text-center">

                              <CardBody>
                                <div
                                  className="timeline timeline-one-side"
                                  data-timeline-axis-style="dashed"
                                  data-timeline-content="axis"
                                >
                                  {accountslist.map(account => (
                                    <Card className="bg-gradient-primary">
                                      <CardBody>
                                        <Row>
                                          <div onClick={() => SetAccessToken(account)} className="col">
                                            <CardTitle className="text-uppercase text-muted mb-0 text-white">

                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0 text-white">
                                              {account.name}
                                            </span>
                                          </div>
                                          {/* <Col className="col-auto">
    <a
                         className="avatar rounded-circle"
                         href="#pablo"
                         onClick={() => SetAccessToken(account)}
                       >
                         <img
                           alt="..."
                           src={require("assets/img/theme/team-1.jpg").default}
                         />
                       </a>
    </Col> */}
                                        </Row>
                                        <p className="mt-3 mb-0 text-sm">
                                          <span className="text-nowrap text-light">
                                            {account.category}
                                          </span>
                                        </p>
                                      </CardBody>
                                    </Card>






                                  ))}

                                  {/*<div className="timeline-block">
                                  <span className="timeline-step badge-success">
                                    <i className="ni ni-bell-55" />
                                  </span>
                                  <div className="timeline-content">
                                    <div className="d-flex justify-content-between pt-1">
                                      <div>
                                        <span className="text-muted text-sm font-weight-bold">
                                          Page Name
                          </span>
                                      </div>
                                      <div className="text-right">
                                      </div>
                                    </div>
                                    <h6 className="text-left mt-2 mb-0">
                                      Likes
                      </h6>
                                  </div>
                                </div>*/}
                                </div>
                              </CardBody>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </Modal>


                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
