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
//134712696593275/insights/page_impressions_by_city_unique?&date_preset=last_14d
import React, { useState, useEffect } from "react";
// react library for routing
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import numeral from "numeral";
import routes from "routes.js";

function Admin(props) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  //const [data, setData] = useState(null);
  const location = useLocation();

  const [reloadState, setReloadState] = useState(false)
  const history = useHistory()
  const data2 = props.data
  const [data, setData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [fansonline, setFansOnline] = useState([]);
  const [fansonline2, setFansOnline2] = useState([]);
  const [postcountweek, setpostcountweek] = useState([]);
  const [age, setAge] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalreacts, setTotalReacts] = useState([]);
  const [postsid, setPostID] = useState([]);
  const [oldengagement, setOldEngagement] = useState([]);
  const [followsweek, setfollowsweek] = useState([]);
  const [pageimage, setPageImage] = useState({});
  const [oldimpressions, setOldImpressions] = useState([]);
  const [newfollows, setNewFollows] = useState([]);
  const [fourteenreach, setFourteenReach] = useState([]);
  const [fourteenreach2, setFourteenReach2] = useState([]);
  const [namepicture, setNamePicture] = useState([]);
  const [pagename, setPageName] = useState('');
  const [oldpagefans, setOldPageFans] = useState([]);
  const [postcomment, setPostComment] = useState([]);
  const [pageid, setPageID] = useState([null]);
  const [setinsta, setInsta] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [accountslist, setAccountsList] = useState([]);
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState([]);

  const firebase = window.firebase;
  const db = firebase.firestore();
  var moment = require('moment');
  //const user = firebase.auth().currentUser;
  //const userEmail = user?.providerData[0]?.email;
  var previousweek = moment().subtract('days', 7).format('MM/DD/YYYY')
  const override = css`
  
  display: block;
  margin: 20% auto;
justifyContent: 'center';
alignItems: 'center';

`;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user==**', user);
      if (user) {
        const docRef = db.collection("Users").doc(user.email);
        console.log('just loaded00==**', user.email)
        docRef.get().then((doc) => {
          console.log('just loaded01==**')
          if (doc.exists) {
            console.log('just loaded1==**')
            const page_id_response = doc.get("Page_ID");

            window.FB.getLoginStatus((response) => {
              console.log('just loaded2==**', response)
              if (response.status === 'connected') {

                const User_Access_Token = response.authResponse.accessToken;
                setData(prev => ({ ...prev, User_Access_Token }));
                //alert("logged in")

                const PageID = `${page_id_response}`


                window.FB.api(
                  `https://graph.facebook.com/${PageID}?fields=access_token&access_token=${User_Access_Token}`,
                  'GET',
                  function (response) {
                    var Page_Access_Token = response.access_token;

                    setData(prev => ({ ...prev, Page_Access_Token }));
                    window.FB.api(
                      `${PageID}/`,
                      'GET',
                      { access_token: Page_Access_Token },
                      function (response) {
                        const newPageName = response.name;
                        setPageName(newPageName);

                        window.FB.api(
                          `${PageID}/instagram_accounts`,
                          'GET',
                          { access_token: Page_Access_Token },
                          function (response) {
                            setInsta(response)
                          });

                        window.FB.api(
                          `${PageID}/insights/page_post_engagements?&since=${previousweek}`,
                          'GET',
                          { access_token: Page_Access_Token },
                          function (response) {
                            const newEngagement2 = response.data;
                            setOldEngagement(newEngagement2);//[1],[0]
                            console.log("ENGAGEMENT OLD", response)

                            window.FB.api(
                              `${PageID}/?fields=fan_count`,
                              'GET',
                              { access_token: Page_Access_Token },
                              function (response) {
                                console.log("liesssss ",response.fan_count)
                                const newFollowers = response.fan_count;
                                setFollowers(newFollowers);



                                  window.FB.api(
                                    `${PageID}/insights/page_fan_adds_unique?date_preset=last_7d`,
                                    'GET',
                                    { access_token: Page_Access_Token },
                                    function (response) {
                                      setOldPageFans(response.data);
                                      console.log("olddd", response.data[1]?.values[6]?.value)
                                    });

                                window.FB.api(
                                  `${PageID}/insights/page_daily_follows_unique?&since=${previousweek}`,
                                  'GET',
                                  { access_token: Page_Access_Token },
                                  function (response) {
                                    setfollowsweek(response.data);

                                  });

                                window.FB.api(
                                  `${PageID}/feed?fields=id,permalink_url,message,created_time,admin_creator,full_picture,icon,shares,comments.summary(total_count),reactions.summary(total_count)&limit=19`,
                                  'GET',
                                  { access_token: Page_Access_Token },
                                  
                                  async function (response) {
                                    console.log("dddddddd",response)
                                      const Posts = response?.data
                                      await Promise.all(Posts.map(async post => {
                                        const PostsRef = db.collection("Page_Posts").doc(newPageName).collection('Posts');
                                        const doc = await PostsRef.where('id', '==', post.id).get();
                                        if (!doc.docs.length) {
                                          return PostsRef.add({
                                            id: post?.id || '',
                                            icon: post?.icon || '',
                                            created_time: post?.created_time || '',
                                            admin_creator: post?.admin_creator?.name || '',
                                            reactions: post?.reactions?.summary?.total_count || '',
                                            shares: post?.shares?.count || '',
                                            message: post?.message || '',
                                            url: post?.permalink_url || '',
                                          })
                                        }
                                      }));
                                      setPosts(response.data);
                                  });

                                window.FB.api(
                                  `${PageID}/feed?fields=id&limit=1`,
                                  'GET',
                                  { access_token: Page_Access_Token },
                                  function (response) {
                                    const postId = response.data[0]?.id;
                                    setPostID(postId);
                                    //setPostID(response.data.posts[0]?.id)

                                    window.FB.api(
                                      `${PageID}/picture?redirect=false`,
                                      'GET',
                                      { access_token: Page_Access_Token },
                                      function (response) {
                                        const pageImageRes = response.data;
                                        setPageImage(pageImageRes);

                                        window.FB.api(
                                          `${PageID}/insights/page_posts_impressions_unique?&date_preset=last_14d`,
                                          'GET',
                                          { access_token: Page_Access_Token },
                                          function (response) {
                                            setFourteenReach(response?.data);

                                          });

                                        window.FB.api(
                                          `${PageID}/insights/page_posts_impressions_unique?&date_preset=last_28d`,
                                          'GET',
                                          { access_token: Page_Access_Token },
                                          function (response) {
                                            setFourteenReach2(response?.data);

                                          });

                                        //onlibne
                                        window.FB.api(
                                          `${PageID}/insights/page_fans_online`,
                                          'GET',
                                          { access_token: Page_Access_Token },
                                          function (response) {
                                            const values = Object.values(response?.data[0]?.values[1]?.value);

                                            const myVal = values.indexOf(Math.max(...values))
                                            //const secondval = Math.myVal.apply(null, values)
                                            console.log("first time", myVal)
                                            var arr = values; // use int arrays
                                            var max = Math.max.apply(null, arr); // get the max of the array
                                            arr.splice(arr.indexOf(max), 1); // remove max from the array
                                            const secondVal = Math.max.apply(null, arr)
                                            const secondValIndex = values.indexOf(secondVal)
                                            console.log("second num ====>", secondVal); // get the 2nd max
                                            console.log("index of second num ===>", secondValIndex)
                                            console.log("ssssssss");
                                            if (myVal < 10) {
                                              const stringedVal = '0' + myVal
                                              setFansOnline(stringedVal)
                                            } else {
                                              setFansOnline(myVal)
                                            }
                                            if (secondValIndex < 10) {
                                              const stringedVal2 = '0' + secondValIndex
                                              setFansOnline2(stringedVal2)
                                            } else {
                                              setFansOnline2(secondValIndex)
                                            }
                                            console.log("index of second num ===>", fansonline, fansonline2)


                                          });

                                        window.FB.api(
                                          `${PageID}/insights/page_posts_impressions_organic_unique?total_count&since=${previousweek}`,
                                          'GET',
                                          { access_token: Page_Access_Token },
                                          function (response) {
                                            const impress6 = response.data;
                                            setOldImpressions(impress6);
                                            console.log("sddddd", oldimpressions[1]?.values[1]?.value)
                                            console.log("IMPRESSIONS OLD", response)

                                            window.FB.api(
                                              `${postId}/insights/post_reactions_by_type_total`,
                                              'GET',
                                              { access_token: Page_Access_Token },
                                              function (response) {
                                                const impress5 = response.data;
                                                setTotalReacts(impress5);
                                                console.log("impress5===>>", impress5)

                                                window.FB.api(
                                                  `${PageID}/insights/page_fans_gender_age`,
                                                  'GET',
                                                  { access_token: Page_Access_Token },
                                                  function (response) {
                                                    const impress9 = response.data;
                                                    setAge(impress9);
                                                    console.log("impress5===>>", impress9)

                                                    window.FB.api(
                                                      `${PageID}/published_posts?summary=total_count&since=${previousweek}`,
                                                      'GET',
                                                      { access_token: Page_Access_Token },
                                                      function (response) {
                                                        const impress99 = response;
                                                        setpostcountweek(impress99);
                                                        console.log("PostsWeek", postcountweek)
                    
                                                  

                                                    window.FB.api(
                                                      `${postId}/comments?filter=toplevel&limit=50`,
                                                      'GET',
                                                      { access_token: User_Access_Token },
                                                      async function (response) {
                                                        const Comments = response?.data
                                                        await Promise.all(Comments.map(async comment => {
                                                          const commentsRef = db.collection("Comments").doc(newPageName).collection('Comments');
                                                          const doc = await commentsRef.where('commentId', '==', comment.id).get();
                                                          if (!doc.docs.length) {
                                                            return commentsRef.add({
                                                              postId,
                                                              comment: comment?.message,
                                                              commentId: comment?.id
                                                            })
                                                          }
                                                        }));
                                                        setPostComment(Comments[0]?.message);

                                                        await db.collection("Pages").doc(newPageName).set({
                                                          PostsWeek: numeral(postcountweek.summary?.total_count).format('0,0') || '',
                                                          Engagement: numeral(oldengagement[1]?.values[3]?.value).format('0,0') || '',
                                                          Reach: numeral(impress6[1]?.values[3]?.value).format('0,0') || '',
                                                          Followers: numeral(newFollowers).format('0,0') || '',
                                                          PageImage: pageImageRes.url || '',
                                                          PageName: newPageName || '',
                                                          
                                                        })
                                                        setUserEmail(user.email);

                                                      });
                                                  });
                                              });
                                          });
                                      });
                                  });
                                });
                              });

                          });


                      });
                  });
              } else if (response.status === 'not_authorized') {
                console.log('not auithorised')
                history.push('/Auth')
              } else {
                history.push('/Auth')
                console.log('not logged in')
                //alert("not logged in")
              }
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            history.push('/Auth')
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
          history.push('/Auth')
        });
      } else {
        history.push('/Auth')
      }
    })

  }, [])





  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component comments={comments} oldpagefans={oldpagefans} age={age} oldengagement={oldengagement} fansonline2={fansonline2} fourteenreach2={fourteenreach2} totalreacts={totalreacts} fansonline={fansonline} oldimpressions={oldimpressions} followsweek={followsweek} postcountweek={postcountweek} postcomment={postcomment} postsid={postsid} newfollows={newfollows} setinsta={setinsta} pageimage={pageimage} pagename={pagename} followers={followers} posts={posts} pageimage={pageimage} fourteenreach={fourteenreach} {...props} data={data} />}
            // component={prop.component}
            key={key}
          />
        );
      } else {
        return null;

      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  return (
    <>
      {userEmail ? <div>
        <Sidebar
          routes={routes}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          logo={{
            innerLink: "/",
            imgSrc: require("assets/img/brand/argon-react.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContentRef}>
          <div>
            <AdminNavbar
              theme={getNavbarTheme()}
              toggleSidenav={toggleSidenav}
              sidenavOpen={sidenavOpen}
              brandText={getBrandText(location.pathname)}
            />
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/dashboard" />
            </Switch>
            <AdminFooter />
          </div>
        </div>


        {sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={toggleSidenav} />
        ) : null}
      </div> : <HashLoader color='#5DE3FF' css={override} loading={true} size={150} />}
    </>
  );
}

export default Admin;
