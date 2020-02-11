import React, {useEffect,useState} from "react";

import url from "url.js";
import Gallery from "react-photo-gallery";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,

} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import {Link} from 'react-router-dom'
import LandingPage from "./LandingPage";
import { get_sathi } from "api";
import { resource_url } from "api";

function ProfilePage(props) {  
  useEffect(() =>{
    const id = props.match.params.id
    get_sathi(id).then(res => {
      setProfile(res.sathi)
      let photos =  res.sathi.photos
      let img_arr = []
      photos.forEach(photo => img_arr.push(photo.image))
      setImages(img_arr)
    })
  },[])

  const [profile, setProfile] = useState({});
  const [images, setImages] = useState([])

  console.log(profile)
  var items = images.map(img => {
    return {
      src: resource_url + img,
      width: 1,
      height:1,
      padding:10
    }
  })

  // document.documentElement.classList.remove("nav-open");
  // useEffect(() => {
  //   
  //   console.log(url+'/api/sathi/'+id)
    
  //   // 
  //   // 
  //   // .catch(err => console.log(err))
  //   // document.body.classList.add("/");
  //   // return function cleanup() {
  //   //   document.body.classList.remove("/");
  //   // };
  // },[]);

    return (
      <div>
        <ExamplesNavbar {...props} />
        <ProfilePageHeader />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={resource_url + images[0]}
                />
              </div>
              <div className="name">
                <h2 className="title text-dark">
                  {profile.name} <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center text-dark" md="6">
                <h6 className="description text-dark">Description</h6>
                <p>
                  {profile.description}
                </p>
                <br />
              {/* <Button className="btn-round" color="default" outline>
                      <i className="fa fa-cog" /> Settings
          </Button> */}
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <h6 className="title text-dark">Languages
                <br />
                  <p>{profile.languages}</p>
                </h6>
              <h6 className="title text-dark">Interests
                <br />
                  <p>{profile.interests}</p>
                </h6>

              <h6 className="title text-dark">Location
                <br />

                  <p>{profile.location}</p>
                </h6>
                <h4><strong>Photos</strong></h4>
              <Gallery photos={items} margin={10}/> 

              </Col>
            </Row>
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              {!props.location.fromLocal &&
                <a href={'/checkout#sathi?'+profile.id} type='sathi'>
                  <Button  className="btn-round h6" color="info">
                    Hire Now
                  </Button>
                </a>
              }
            </Col>
            {!props.location.fromLocal && <LandingPage {...props} />}
            {/* <DemoFooter /> */}
          </Container>
      </div>

    </div>
  )
}
export default ProfilePage;
