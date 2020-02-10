
import React,{useState,useEffect, useContext} from "react";
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
import Context from "context/context";
import { get_all_sathis, get_all_events, resource_url, get_all_foods } from "api";

function LandingPage(props) {
  console.log(props)
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {

    // axios.get(url+'/api/sathi/').then(resp => setSathis(resp.data))
    get_all_sathis().then(res => setSathis(res.data.allSathis.filter(sathi => sathi.id !== props.match.params.id )))
    get_all_events().then(res => setEvents(res.data.allEvents.filter(evnt => evnt.id !== props.match.params.id)))
    get_all_foods().then(res => setFoods(res.data.allFoods.filter(f => f.id !== props.match.params.id)))

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

  const {user, setUser} = useContext(Context)
  // console.log(user.isLoggedIn)
  // sathis.filter(sathi => sathi.id !== user.id )
  const slicedSathis = userSM ?  sathis :  sathis.slice(0,3)
  const slicedEvents = eventSM? events: events.slice(0,3)
  const slicedFoods = foodSM? foods: foods.slice(0,3)
  return (
    <>
      {/* <ExamplesNavbar {...props} /> */}
      {/* <LandingPageHeader /> */}
      <div className="main">
        <div className="section section-nude text-center" >
          <Container  style={{color:'#000'}} >
            <h3 className='text-center text-dark font-weight-bold'>Similar Offers</h3>
            <h3 className="title">Companions around you</h3>
            <Row>
              {slicedSathis.map( sathi => 
              <Col md="4" >
                <Col md='12' className=' rounded border shadow mb-20' style={{height:500, marginBottom:10}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link onClick={()=> window.location.replace('/user/'+sathi.id)} >
                        {sathis.length !== 0 &&
                          <img
                            alt="..."
                            src={resource_url + sathi.photos[0].image}
                          />
                        }
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href=" " onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">
                          <Link className='font-weight-bold text-primary'  onClick={()=> window.location.replace('/user/'+sathi.id)}>{sathi.name} </Link>
                          </CardTitle>
                        </div>
                      </a>
                      <br />
                      <h4 className='text-success font-weight-bold'> Nrs. {sathi.price}</h4>
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
            <h3 className="title">Events Near You</h3>
            <Row>
              {slicedEvents.map(event => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/event/'+ event.id, id:event.id}}>
                        {events.length !== 0 &&
                          <img
                            alt="..."
                            src={resource_url + event.photos[0].image}
                          />
                        }
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4" className='font-weight-bold'>{event.name}</CardTitle>
                        </div>
                      </a>
                      <h4 className='text-success font-weight-bold'> Nrs. {event.price}</h4>
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
            <h3 className="title">Cook {'&'} Dine Near You</h3>
            <Row>
              {slicedFoods.map(food => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/cookndine/'+ food.id, id:food.id}}>
                        {foods.length !== 0 &&
                          <img
                            alt="..."
                            src={resource_url + food.photos[0].image}
                          />
                        }
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">{food.name}</CardTitle>
                        </div>
                      </a>
                      <h4 className='text-success font-weight-bold'> Nrs. {food.price}</h4>
                      <p className="card-description text-center text-dark">
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
