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
import routes from "routes.js";
const moment = require('moment');

function Admin(props) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const history = useHistory()

  const [reloadState, setReloadState] = useState(false)
  const [data, setData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [fansonline, setFansOnline] = useState([]);
  const [fansonline2, setFansOnline2] = useState([]);
  const [postcountweek, setpostcountweek] = useState([]);
  const [age, setAge] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalpostclicks, setTotalPostClicks] = useState([]);
  const [postavengagement, setPostEngagement] = useState([]);
  const [postreach, setPostReach] = useState([]);
  const [totalreacts, setTotalReacts] = useState([]);
  const [AdPostEngagement, setAdPostEngagement] = useState([]);
  const [postsid, setPostID] = useState([]);
  const [oldengagement, setOldEngagement] = useState([]);
  const [followsweek, setfollowsweek] = useState([]);
  const [pageimage, setPageImage] = useState({});
  const [oldimpressions, setOldImpressions] = useState([]);
  const [postcoommentlikes, setpostcommentlikes] = useState([]);
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

  const [page, setPage] = useState(null)

  const firebase = window.firebase;
  const db = firebase.firestore();
  var previousweek = moment().subtract('days', 7).format('MM/DD/YYYY');

  const override = css`
  display: block;
  margin: 20% auto;
justifyContent: 'center';
alignItems: 'center';
`;

  useEffect(() => {

    console.log("useEffect 5")
    console.log("ffdfdfdfd")
    const subscription = firebase.auth().onAuthStateChanged(async user => {
      console.log('user==**', user);
      if (user) {
        try {
          const doc = await db.collection("Users").doc(user.email).get();
          console.log('just loaded01==**')
          if (doc.exists) {
            console.log('just loaded1==**')
            const pageName = doc.get("Page_Name");

           


            window.FB.getLoginStatus(async (response) => {
              console.log('just loaded2==**', response)
              if (response.status === 'connected') {
                // fetch page from firebase



                const currentPage = await db.collection('Pages').doc(pageName).get();
                console.log('currentPage==>>', currentPage.data());
                setPage(currentPage.data());

                

              } else if (response.status === 'not_authorized') {
                //console.log('not auithorised')
                history.push('/Admin')
              } else {
                // console.log('not logged in')
                //alert("not logged in")
              }
            });
          } else {
            history.push('/Auth');
          }
        } catch (err) {
          console.log('an error occurred==>>', err);
          history.push('/Auth');
        }
      } else {
        history.push('/Auth')
      }
    });

    return subscription;
  }, [])





  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    console.log("useEffect 6")
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
            render={(props) => <prop.component {...props} Engagement_Today={page.Engagement_Today} posts={posts} ShareofVoice={page.ShareVoice} TotalPostReach={page.TotalPostReach} Engagement_7days={page.Engagement_7days} postreach={page.AveragePostReach} AveragePostEngagement={page.AverageEngagement} postavengagement={page.Engagement_Today} oldpagefans={page.Fans_7days} age={page.FanDemographics} oldengagement={page.Engagement_7days} fansonline2={page.FansOnline2} fourteenreach2={page.fourteenReach} /*totalreacts={totalreacts}*/ fansonline={page.FansOnline1} oldimpressions={page.OldReach} Reach={page.Reach} postcountweek={page.PostsWeek} newfollows={page.Fans_Today} pagename={page.PageName} followers={page.Followers} fourteenreach={page.fourteenReach} data={data} />}
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
      {page ? <div>
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
