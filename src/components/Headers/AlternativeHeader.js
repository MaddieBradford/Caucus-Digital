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
import React, {useState} from "react";
import classnames from "classnames";
import Select2 from "react-select2-wrapper";
import TagsInput from "components/TagsInput/TagsInput.js";
import '../../assets/css/Alternativeheader.css'
import ReactDatetime from "react-datetime";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Row,
  Col,
  Input,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

function AlternativeHeader({setSelectedParty, setSortField, setFilter, searchTerm, setSearchTerm}) {
  const [avatarShow, setAvatarShow] = useState(false)

  const filterPosts = party => {
    console.log('party==>>', party);
    setSelectedParty(party); 

    
  }

  const toggleAvatars = () => {
setAvatarShow(!avatarShow)
  }
 
  return (
    <>
      <div className="header pb-6">
        <Container fluid>
          <div className="header-body custom-header-body">
            
             
     <div className="d-flex mr-5">
       
     <UncontrolledDropdown group>
             <DropdownToggle className="avatar rounded-circle bg-default">
          
            <i className="ni ni-istanbul" /> 
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown">
          <li>
            <DropdownItem onClick={() => filterPosts('Labor')}  className="avatar rounded-circle">
                <img alt="..." src={require("assets/img/theme/dan.jpeg").default} /> 
              </DropdownItem>
              <p className="mb-0">Labor</p>
              </li>
              <li>
              <DropdownItem  onClick={() => filterPosts('Liberal')}  className="avatar rounded-circle">
                <img alt="..." src={require("assets/img/theme/obrien.jpeg").default} /> 
              </DropdownItem>
              <p className="mb-0">Liberal</p>
              </li>
              <li>
              <DropdownItem  onClick={() => filterPosts('Green')}  className="avatar rounded-circle">
                <img alt="..." src={require("assets/img/theme/samrat.jpeg").default} /> 
              </DropdownItem>
              <p className="mb-0">Green</p>
              </li>
              <li>
              <DropdownItem  onClick={() => filterPosts('Independent')}  className="avatar rounded-circle">
                <img alt="..." src={require("assets/img/theme/fiona.jpeg").default} /> 
              </DropdownItem>
              <p className="mb-0">Independent</p>
              </li>
              <li>
              <DropdownItem  onClick={() => filterPosts('National')}  className="avatar rounded-circle">
                <img alt="..." src={require("assets/img/theme/walsh.jpeg").default} /> 
              </DropdownItem>
              <p className="mb-0">National</p>
              </li>
             
              <a className=" "></a>
          <a className=" "></a>
          
         
          </DropdownMenu>
         </UncontrolledDropdown>

       
         

         <UncontrolledDropdown group>
          <DropdownToggle className="avatar rounded-circle bg-default">
          
            <i className="ni ni-like-2" /> 
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown">
          <li>
          <DropdownItem  onClick={() => setFilter('facebook')} className="avatar rounded-circle bg-blue text-white">
          <img alt="..." src={require("assets/img/theme/dan.jpeg").default} />
                  </DropdownItem>
                  <p className="mb-0">Facebook</p>
                  
                  </li>
                  <li>
              <DropdownItem  onClick={() => setFilter('twitter')} className="avatar rounded-circle bg-blue text-white">
          <img alt="..." src={require("assets/img/theme/dan.jpeg").default} />
                  </DropdownItem>
                  <p className="mb-0">Twitter</p>
                    </li>
                    <li>
              <DropdownItem  onClick={() => setFilter('ad')} className="avatar rounded-circle bg-blue text-white">
          <img alt="..." src={require("assets/img/theme/dan.jpeg").default} />
                  </DropdownItem>
                  <p className="mb-0">Advertisement</p>
                    </li>
                    <li>
              <DropdownItem  onClick={() => setFilter('')} className="avatar rounded-circle bg-blue text-white">
          <img alt="..." src={require("assets/img/theme/dan.jpeg").default} />
                  </DropdownItem>
                  <p className="mb-0">All Posts</p>
                    </li>
          </DropdownMenu>
         </UncontrolledDropdown>

         

         <UncontrolledDropdown group>
          
         

          {/* <div className="seperator"></div> */}

          <button onClick={e => setSortField('dateField')} className="avatar rounded-circle border-0 bg-blue text-white">
              <i className="ni ni-chart-bar-32" />      
              </button>

         </UncontrolledDropdown>
         <UncontrolledDropdown group>

         <button onClick={e => setSortField('reactionsField')} className="avatar rounded-circle border-0 bg-blue text-white">
              <i className="ni ni-time-alarm" />      
              </button>
              </UncontrolledDropdown>
        </div>





         <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search Posts, Ads and Tweets" type="text" className="max-250" />
        
      
       </div>
        </Container>
      </div>
      
    </>
    
  );
  
}
  

export default AlternativeHeader;
