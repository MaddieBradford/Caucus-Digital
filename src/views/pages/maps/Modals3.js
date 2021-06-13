import React, { useState, useEffect } from "react";
// react plugin for creating vector maps
// javascipt plugin for creating charts
import Chart from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// react plugin used to create charts
import ReactWordcloud from 'react-wordcloud';
import numeral from "numeral";
import _ from 'lodash';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  Modal,
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

class Modals extends React.Component {
 
  state = {
    chartExample: null,
    words: {}
  }

  setData = async () => {
    const { modalData} = this.props;
    console.log("infooo22****", modalData)

          this.setState({
            chartExample: {
              ...chartExample6,
              data: {...chartExample6.data,
                    labels: modalData?.reactiontypes?.map(v => (v.label)),
                    datasets: [{data: modalData?.reactiontypes?.map(v => v.value)}]}
          }})    

          const posts = await db.collection("Page_Posts").doc(modalData.pagename).collection('Posts').get();
          const allComments = _.flattenDeep(posts.docs.map(doc => decodeURI(doc.data().message)));
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
      this.setState({words: filteredTextLegend});
      
    
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps****", prevProps, 'thisprops==>.', this.props)
    if (this.props.modalData.id && prevProps.modalData.id !== this.props.modalData.id) {
      this.setData();
    }
  }


  render() {
    const {show, handleClose, handleShow, modalData} = this.props;
    const {chartExample, words} = this.state;
    const newWords = Object.entries(words).map(([k, v]) => ({ text: k, value: v }));
    console.log('statwe in state****', this.state)
  
 



    return (
      <Modal
              className="modal-dialog-centered custom modal-danger"
              contentClassName="bg-white"
              isOpen={show}
              toggle={handleClose}
            >
      
              <div className="modal-header">
             
              <Container fluid>
        
        {/* <Row>
          
        <Col md="6" xl="3">
            <Card className="bg-blue border-0">
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
                    {numeral(modalData.reactions).format('0,0')|| 0}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-blue border-0">
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
                    {numeral(modalData.comments).format('0,0')|| 0}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-blue border-0">
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
                    {numeral(modalData.shares).format('0,0') || 0} 
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-blue border-0">
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
                      {numeral(modalData.postreach).format('0,0') || 0}
                    </span>

                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        
        </Container>
                
              </div>
              

              <div className="modal-body custom">
                
             
           <Card className="d-flex align-items-center justify-content-center">
             
         
             <div className="chart">
               
             <ListGroup>
              
          {Object.entries(words).sort((a,b) => a[1] > b[1] ? -1 : 1).map(([k,v]) => <ListGroupItem className="justify-content-between align-items-center text-default">
           {k}
            <Badge color="primary" pill>
              {v}
            </Badge>
          </ListGroupItem>)}
             
        </ListGroup>
             </div>
           </Card>
           

           <Card className="custom-bg-lightgray">
         
           <CardBody className="bg-blue custom">
                <Row className="justify-content-between align-items-center">
                  <div className="col">
                  <ListGroup flush>
          <ListGroupItem
            className="list-group-item-action"
            href="#pablo"
            onClick={e => e.preventDefault()}
            tag="a"
          >
            <Row className="align-items-center">
              <Col className="col-auto">

                <img
                  alt="..."
                  className="avatar rounded-circle"
                  src={require("assets/img/theme/team-1.jpg").default}
                />
              </Col>
              <div className="col ml--2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-0 text-sm">John Snow</h4>
                  </div>
                  <div className="text-right text-muted">
                    <small>2 hrs ago</small>
                  </div>
                </div>
                <p className="text-sm mb-0">
                  Let's meet at Starbucks at 11:30. Wdyt?
                </p>
              </div>
            </Row>
          </ListGroupItem>
        </ListGroup>
                  </div>
                </Row>
               
              </CardBody>
              
              <Media className="media-comment">
                
              <Card>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                 
                    <span className="text-muted"></span>
                    
                  </a>
                  
                  </Card>
                  <Media className="w-100">
                   
                    <div className="media-comment-text w-100 bg-white">
                      
                      <h6 className="h5 mt-0"></h6>
                    
                      <p className="text-sm lh-160 text-dark">
                        
                      {decodeURI(modalData.topcomment)}
                        </p>
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">{numeral(modalData.topcommentlikes).format('0,0')}</span>
                        </a>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                       
                          <span className="text-muted"></span>
                        </a>
                      </div>
                      
                    </div>
                  </Media>

                </Media>
                
           </Card>
              </div>

              
                
         

            
             
            </Modal>
    );
  }
}

export default Modals;