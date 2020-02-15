
import React, {useEffect,useState, useContext} from "react";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import Gallery from "react-photo-gallery";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from 'axios'
import CookNDineHeader from "components/Headers/CookNDineHeader";
import LandingPage from 'views/examples/LandingPage'
import { get_food } from "api";
import { resource_url } from "api";
import { Link } from "react-router-dom";
import Context from "context/context";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";

function CookNDine(props) {
  const id = props.match.params.id
  const [viewport, setViewport] = useState({
		center : [27.694483, 85.311253],
		zoom: 13,
	  });
  useEffect(() =>{
    get_food(id)
    .then(res => {
      setCook(res.food)
      let photos =  res.food.photos
      let img_arr = []
      photos.forEach(photo => img_arr.push(photo.image))
        setImages(img_arr)
        setViewport({zoom:17, center:[res.food.lat, res.food.lon]})
        if(res.event.booktime.length !== 0) setUser({...user, timeId:res.food.booktime[0].id, category:1, categoryId:Number(id) })
    })
    .catch(err => console.log(err))
  },[])

  const [cook, setCook] = useState({});
  const [images, setImages] = useState([])
  const {user, setUser} = useContext(Context)

  var items = images.map(img => {
    return {
      src: resource_url + img,
      width: 4,
      height: 3,
      padding:10
    
    }
  })

  console.log(cook)
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
                  {cook.name} <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="mx-auto text-center text-dark" md="6">
                <p style={{fontSize:15,fontFamily:'Sans'}}>
                  {cook.description}
                </p>
                <br />
            </Col>
          </Row>
          <Row>
            <Col className="mx-auto text-center text-dark" sm="6">
              <Table borderless>
                <tbody>
                  
                  {cook.user &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Hosted By</td>
                      <th  scope="row" style={{fontSize:18,fontFamily:'Arial'}}>{`${cook.user.firstName} ${cook.user.lastName}`}</th>
                    </tr>
                  }

                  {cook.cook &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial'}} >Cook</td>
                      {cook.cook ?
                        <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">Yes</th>:
                        <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">No</th>
                      }
                    </tr>
                  }
                  
                  {cook.location &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}} >Location</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">{cook.location}</th>
                    </tr>
                    
                  }
                  {cook.price &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}} >Price</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}} scope="row"> Nrs. {cook.price}</th>
                    </tr>
                    
                  }
                  { cook.booktime !== undefined &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Date</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}}  scope="row">{cook.booktime[0].date}</th>
                    </tr>
                  }
                </tbody>
              </Table>
                <h4 className='font-weight-bold text-info'><strong>Photos</strong></h4>
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
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <Link to='/checkout' className='btn-round btn-info btn' onClick={() => setUser({...user, category:1, id:Number(props.match.params.id) })}>
                  Attend
                </Link>
            </Col>
            <LandingPage {...props} />
            <DemoFooter />
          </Container>
      </div>

    </div>
  )
  // }
  // else{
  //   return (
  //     <div>
  //       <ExamplesNavbar {...props} />
  //         <ProfilePageHeader />
  //    <Gallery photos={items} />
  //    </div>
  //   )
  // }
}
export default CookNDine
