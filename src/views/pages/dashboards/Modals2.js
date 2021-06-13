import React, { useState, useEffect } from "react";
// react plugin for creating vector maps
// javascipt plugin for creating charts
import Chart from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// react plugin used to create charts
import ReactWordcloud from 'react-wordcloud';
import numeral from "numeral";
import ReactQuill from "react-quill";
import Dropzone from "dropzone";
import ReactSpeedometer from "react-d3-speedometer"
import _ from 'lodash';
import stringSimilarity from 'string-similarity';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  Modal,
  ModalBody,
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
  Alert,
  UncontrolledAlert,
  Table,
  Container,
  Row,
  Col,
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
import "./Modal.css";


const firebase = window.firebase;
const db = firebase.firestore();

//const [wordss, setWordss] = React.useState({});
//const newWords = Object.entries(wordss).map(([k, v]) => ({ text: k, value: v }));



const callbacks = {
  getWordColor: word => word.value > 1 ? "white" : "white",
}

Dropzone.autoDiscover = false;

class Modals2 extends React.Component {

  state = {
    chartExample: null,
    words: {},
    reactQuillText: "",
    highestSimilarity: 0
  }

  onModalOpened() {
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-single"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-single")[0].innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          console.log('file==>>>', file)
          currentSingleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  handleReactQuillChange = value => {
    this.setState({ reactQuillText: value });
  };

  calculateSimilarity = async () => {
    const { reactQuillText } = this.state;
    try {
      const postPages = (await db.collection("Page_Posts").get()).docs.map(p => ({ id: p.id }));
      let allPosts = await Promise.all(postPages.map(page => {
        return db.collection("Page_Posts").doc(page.id).collection('Posts').get();
      }));
      allPosts = _.flatten(allPosts.map(post => post.docs.map(p => ({ ...p.data() }))));
      // setPosts(allPosts);
      const similarities = allPosts.map(post => {
        const formattedFromDb = decodeURIComponent(post.message).replace(/^\s+|\s+$/g, '').replace(/(\r\n|\n|\r)/gm, "");
        const formattedInputText = reactQuillText.replace(/(<([^>]+)>)/ig, "");
        console.log('reactQuillText****', decodeURIComponent(post.message).replace(/^\s+|\s+$/g, '').replace(/(\r\n|\n|\r)/gm, ""), 'reeem==>>', decodeURIComponent(post.message)) //reactQuillText.replace(/(<([^>]+)>)/ig,"") test
        return stringSimilarity.compareTwoStrings(formattedFromDb, formattedInputText);
      });
      const highestSimilarity = Math.max(...similarities);
      const highestSimilarityIndex = similarities.findIndex(s => s === highestSimilarity);
      const highestSimilarityPost = allPosts[highestSimilarityIndex];
      console.log("highestSimilarityPost****", highestSimilarityPost, 'highestSimilarity==>>', highestSimilarity);
      this.setState({ highestSimilarity });
    } catch (err) {
      console.log('an error occuured==>>', err);
    }
  }

  render() {
    const { show, handleClose } = this.props;
    const { highestSimilarity } = this.state;

    return (
      <Modal
        className="modal-dialog-centered modal-danger custom modal2"
        contentClassName="bg-white"
        isOpen={show}
        onOpened={this.onModalOpened}
        toggle={handleClose}
      >
        <div className="modal-body custom">



          <Card className="custom-bg-lightgray">

            <Row className="justify-content-between">

              <div className="col">
                <div className="dropzone dropzone-single mb-3" id="dropzone-single">
                  <div className="fallback">
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="projectCoverUploads"
                        type="file"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="projectCoverUploads"
                      >Choose file</label>
                    </div>
                  </div>
                  <div ref={this.dzPreviewSingle} className="dz-preview dz-preview-single">
                    <div className="dz-preview-cover">
                      <img
                        alt="..."
                        className="dz-preview-img"
                        data-dz-thumbnail=""
                      />
                    </div>
                  </div>
                </div>
                
              </div>
            </Row>
            <ReactQuill
                  value={this.state.reactQuillText}
                  onChange={this.handleReactQuillChange}
                  theme="snow"
                  modules={{
                    toolbar: [
                      ["bold", "italic"],
                      ["link", "blockquote"],
                      [
                        {
                          list: "ordered"
                        },
                        {
                          list: "bullet"
                        }
                      ]
                    ]
                  }}
                />
            <Card className="bg-transparent mb-0 mt-60">            
              <Button block color="default" size="lg" type="button" onClick={this.calculateSimilarity}>
                Review Post
        </Button>

            </Card>



          </Card>


          <Card>
            <CardBody className="bg-white text-default custom">
              <CardHeader>
                <h4>
                  Similarity Score
                </h4>
                <h1 className="mt-3">
                  {numeral(highestSimilarity * 100).format('0,0')} %




                </h1>

              </CardHeader>





              <CardHeader>
Active Feedback
                {/* <ReactSpeedometer
                  value={4}
                  maxValue={5}
                  width={160}
                  height={160}
                  segments={3}
                  needleTransitionDuration={4000}
                  needleTransition="easeElastic"
                  currentValueText="Sentiment"
                  needleColor="white"
                  segmentColors={[
                    "#4fd69c",
                    "#ffd600",
                    "#da1d43",
                  ]}
                  
                /> */}

              </CardHeader>
            </CardBody>
            <CardBody className="bg-white custom maxh-395">
              {highestSimilarity > 0.9 && <UncontrolledAlert className="alert-default" fade={false}>
                <span className="alert-inner--icon">
                  <i className="" />
                </span>{" "}
                <span className="alert-inner--text">  
            <strong>Similarity</strong> Your post is over 90% similar to others,
            consider using more original language.
          </span>
              </UncontrolledAlert>}
            
              <UncontrolledAlert color="primary" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Primary22!</strong> This is a primary alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert color="info" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Info!</strong> This is a info alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert color="success" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Success!</strong> This is a success alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert color="danger" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Danger!</strong> This is a danger alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert color="warning" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Warning!</strong> This is a warning alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert className="alert-default" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Default!</strong> This is a default alert—check it out!
          </span>
              </UncontrolledAlert>
              <UncontrolledAlert color="primary" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Primary!</strong> This is a primary alert—check it out!
          </span>
              </UncontrolledAlert>
            </CardBody>
          </Card>
        </div>


      </Modal>
    );
  }
}

export default Modals2;