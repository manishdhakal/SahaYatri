
import React,{useState,useEffect} from "react";
import axios from 'axios'
import url from 'url.js'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Link } from "react-router-dom";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {

    axios.get(url+'/api/sathi/').then(resp => setSathis(resp.data))
    axios.get(url+'/api/event/').then(resp => setEvents(resp.data))
    axios.get(url+'/api/food/').then(resp => setFoods(resp.data))

    document.body.classList.add("profile");
    return function cleanup() {
      document.body.classList.remove("profile");
    };
  },[]);
  // const []

  const [userSM, setUserSM] = useState(false)
  const [eventSM, setEventSM] = useState(false)
  const [foodSM, setFoodSM] = useState(false)

  const [sathis, setSathis] = useState([])
  const [events, setEvents] = useState([])
  const [foods, setFoods] = useState([])
  console.log(sathis)

  const slicedSathis = userSM ?  sathis :  sathis.slice(0,3)
  const slicedEvents = eventSM? events: events.slice(0,3)
  const slicedFoods = foodSM? foods: foods.slice(0,3)
  return (
    <>
      <ExamplesNavbar />
      <LandingPageHeader />
      <div className="main">
        <div className="section section-nude text-center" >
          <Container  style={{color:'#000'}} >
            <h2 className="title">Companions around you</h2>
            <Row>
              {slicedSathis.map( sathi => 
              <Col md="4" >
                <Col md='12' className=' rounded border shadow mb-20' style={{height:500, marginBottom:10}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/user/'+ sathi.id}} >
                        <img
                          alt="..."
                          src={url+sathi.image[0]}
                        />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href=" " onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4" className='font-weight-bold text-dark'>{sathi.name}</CardTitle>
                        </div>
                      </a>
                      <br />
                      <h4 className='text-info font-weight-bold'>$6/h</h4>
                      <p className="card-description text-center" style={{color:'#000'}}>
                        {sathi.description}
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1 text-dark"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                      <Button
                        className="btn-just-icon btn-neutral ml-1 text-dark"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Col>
              )}
              {/* <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/faces/joe-gardner-2.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Arman Chhetri</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis.
                    </p>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-just-icon btn-neutral ml-1"
                      color="link"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-instagram" />
                    </Button>
                    <Button
                      className="btn-just-icon btn-neutral ml-1"
                      color="link"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-facebook" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/faces/erik-lucatero-2.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Manish Dhakal</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis.
                    </p>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-just-icon btn-neutral ml-1"
                      color="link"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-instagram" />
                    </Button>
                    <Button
                      className="btn-just-icon btn-neutral ml-1"
                      color="link"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-facebook" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col> */}
            </Row>
            {/* <div style={{marginTop:20}}> */}
            {/* <a href='#' className="Button Button--fullWidth Button--inverted Button--orange Button--invertedAlternativeHover">Show more</a>
            </div> */}
            { !userSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setUserSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
            </Container>
        </div>

        <div className="section section-nude text-center">
          <Container>
            <h2 className="title">Events Near You</h2>
            <Row>
              {slicedEvents.map(event => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/event/'+ event.id, id:event.id}}>
                          <img
                            alt="..."
                            src={url+event.image[0]}
                          />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4" className='font-weight-bold'>{event.name}</CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center" style={{color:'#000'}}>
                        {event.description}
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            { !eventSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setEventSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
          </Container>
        </div>
        <div className="section section-nude text-center">
          <Container>
            <h2 className="title">Cook {'&'} Dine Near You</h2>
            <Row>
              {slicedFoods.map(food => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/cookndine/'+ food.id, id:food.id}}>
                          <img
                            alt="..."
                            src={url+food.image[0]}
                          />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">{food.name}</CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        {food.description}
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            { !foodSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setFoodSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto  text-dark" md="8">
                <h2 className="text-center">Keep in touch?</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label className=''>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;
