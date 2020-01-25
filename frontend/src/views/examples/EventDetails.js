
import React, {useEffect,useState} from "react";

import url from 'url.js'
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
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from 'axios'
import EventPageHeader from "components/Headers/EventPageHeader";

function EventDetails(props) {
  
  useEffect(() =>{
    const id = props.match.params.id
    axios.get(url+'/api/event/'+id).then(e => {
      setEvent(e.data[0])
      setImages(e.data[0].image)
    })
  },[])

  const [event, setEvent] = useState({});
  const [images, setImages] = React.useState([])


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

  // console.log(user,images)
    return (
      <div>
        <ExamplesNavbar />
        <EventPageHeader />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={url + images[0]}
                />
                <div className="name">
                <h3 className="title text-dark font-weight-bold ">
                  Event
                </h3>
              </div>
              </div>
              <div className="name">
                <h2 className="title text-dark">
                  {event.name} <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center text-dark" md="6">
                <h6 className="description text-dark">Description</h6>
                <p>
                  {event.description}
                </p>
                <br />
              {/* <Button className="btn-round" color="default" outline>
                      <i className="fa fa-cog" /> Settings
          </Button> */}
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <h6 className="title text-dark">Hosted By
                <br />
                  <p>{event.host}</p>
                </h6>
              <h6 className="title text-dark">Price
                <br /> 
                  <p>{event.pricing} per person</p>
                </h6>

              <h6 className="title text-dark">Location
                <br />

                  <p>{event.location}</p>
                </h6>
                <h4><strong>Photos</strong></h4>
              <Gallery photos={items} margin={10}/> 

              </Col>
            </Row>
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <Button className="btn-round w-25 h6 font-weight-bold" color="primary">
                Attend
              </Button>
            </Col>
            <DemoFooter />
          </Container>
      </div>

    </div>
  )
}
export default EventDetails
