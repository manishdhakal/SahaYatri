
import React, {useEffect,useState, useContext} from "react";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import url from 'url.js'
import Gallery from "react-photo-gallery";
import { resource_url } from "api";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Input,
  Table,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from 'axios'
import EventPageHeader from "components/Headers/EventPageHeader";
import LandingPage from "./LandingPage";
import { get_event } from "api";
import { Link } from "react-router-dom";
import Context from "context/context";

function EventDetails(props) {
  const [event, setEvent] = useState({});
  const [images, setImages] = useState([])
  const {user, setUser} = useContext(Context)
  const id = props.match.params.id
  const [viewport, setViewport] = useState({
		center : [27.684624, 85.333711],
		zoom: 16,
	  });
  useEffect(() =>{
    get_event(id)
    .then(res => {
      setEvent(res.event)
      let photos =  res.event.photos
      let img_arr = []
      photos.forEach(photo => img_arr.push(photo.image))
        setImages(img_arr)
        setViewport({zoom:17, center:[res.event.lat, res.event.lon]})
        if(res.event.booktime.length  !== 0) setUser({...user, timeId:res.event.booktime[0].id, category:2, categoryId:Number(id) })
    })
    .catch(err => console.log(err))
  },[])




  var items = images.map(img => {
    return {
      src: resource_url + img,
      width: 4,
      height: 3,
      padding:10
    }
  })

  let booktime
  if(event.booktime !== undefined)
    booktime = event.booktime.map(time =><option value={time.id}>{time.date}</option>)

    return (
      <div>
        <ExamplesNavbar {...props} />
        <EventPageHeader />
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
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <Table borderless>
                <tbody>
                  
                  {event.user &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Hosted By</td>
                      <th  scope="row" style={{fontSize:18,fontFamily:'Arial'}}>{`${event.user.firstName} ${event.user.lastName}`}</th>
                    </tr>
                  }
                  
                  {event.location &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}} >Location</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">{event.location}</th>
                    </tr>
                    
                  }
                  { event.booktime !== undefined &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Date</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}}  scope="row">{event.booktime[0].date}</th>
                    </tr>
                  }
                </tbody>
              </Table>
            {/* {event.user !== undefined &&
              <h6 className="title text-dark">Hosted By
                <br />
                  <p>{`${event.user.firstName} ${event.user.lastName}`}</p>
              </h6>
            }
              <h6 className="title text-dark">event As well
                <br />
                  {event.event ? <p>yes</p>:<p>no</p>}
                </h6>

                <h6 className="title text-dark">Location
                <br />
                  <p>{event.location}</p>
                </h6>
                { event.booktime !== undefined &&
                  <h6 className="title text-dark">Date
                  <br />
                    <p>{event.booktime[0].date}</p>
                  </h6>
                } */}
                <h4 className='text-info font-weight-bold'><strong>Photos</strong></h4>
              <Gallery photos={items} margin={10}/> 
              <Map className='leaflet-1' center={viewport.center} zoom={viewport.zoom}  style={{marginTop:50, }}
              >
                  <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  
                  />
                  <Marker position={viewport.center} >
                  <Popup>
                      The Location of event.
                  </Popup>  
                  </Marker>
              </Map>
              </Col>
            </Row>
            <br/>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              {/* <Input type="select" name="select" id="exampleSelect" style={{marginBottom:20}} onClick={(e) => setUser({...user,bookiId:e.target.value})} >
                {booktime}
              </Input > */}
                <Link to='/checkout' className='btn-round btn-info btn' onClick={() => setUser({...user, category:2, id:Number(props.match.params.id) })}>
                  Attend
                </Link>
            </Col>
            <LandingPage {...props} />
            <DemoFooter />
          </Container>
      </div>
      </div>
  )
}
export default EventDetails
