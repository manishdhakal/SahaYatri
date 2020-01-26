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

function ProfilePage(props) {  
  useEffect(() =>{
    const id = props.match.params.id
    axios.get(url+'/api/sathi/'+id).then(e => {
      setUser(e.data[0])
      setImages(e.data[0].image)
    })
  },[])

  const [user, setUser] = useState({});
  const [images, setImages] = React.useState([])
  const [activeTab, setActiveTab] = useState("1");


  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };


  var slicedImage = images.slice(0, 3)
  var items = slicedImage.map(img => {
    return {
      src: url + img,
      width: 4,
      height: 3,
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

  console.log(user,images)
    return (
      <div>
        <ExamplesNavbar />
        <ProfilePageHeader />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={url + images[0]}
                />
              </div>
              <div className="name">
                <h2 className="title text-dark">
                  {user.name} <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center text-dark" md="6">
                <h6 className="description text-dark">Description</h6>
                <p>
                  {user.description}
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
                  <p>{user.languages}</p>
                </h6>
              <h6 className="title text-dark">Interests
                <br />
                  <p>{user.interests}</p>
                </h6>

              <h6 className="title text-dark">Location
                <br />

                  <p>{user.places}</p>
                </h6>
                <h4><strong>Photos</strong></h4>
              <Gallery photos={items} margin={10}/> 

              </Col>
            </Row>
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              {user.available ?
              <a href={'/checkout#sathi?'+user.id} type='sathi'>
                <Button  className="btn-round w-25 h6" color="primary">
                  Hire Now
                </Button>
              </a> :
              <h6>Sorry, the companion is not available for now</h6>
              }
            </Col>
            <DemoFooter />
          </Container>
      </div>

    </div>
  )
  // }
  // else{
  //   return (
  //     <div>
  //       <ExamplesNavbar />
  //         <ProfilePageHeader />
  //    <Gallery photos={items} />
  //    </div>
  //   )
  // }
}
export default ProfilePage;
