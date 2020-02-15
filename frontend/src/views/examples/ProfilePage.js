import React, {useEffect,useState, useContext} from "react";

import url from "url.js";
import Gallery from "react-photo-gallery";

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
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import {Link} from 'react-router-dom'
import LandingPage from "./LandingPage";
import { get_sathi } from "api";
import { resource_url } from "api";
import Context from "context/context";

function ProfilePage(props) {  
      const id = props.match.params.id
  useEffect(() =>{

    get_sathi(id).then(res => {
      setProfile(res.sathi)
      let photos =  res.sathi.photos
      let img_arr = []
      photos.forEach(photo => img_arr.push(photo.image))
      setImages(img_arr)
      if(res.sathi.booktime.length !== 0) setUser({...user, timeId:res.sathi.booktime[0].id, category:0, categoryId:Number(id)})
    })
  },[])

  const [profile, setProfile] = useState({});
  const [images, setImages] = useState([])
  const {user, setUser} = useContext(Context)

  console.log(profile)
  var items = images.map(img => {
    return {
      src: resource_url + img,
      width: 1,
      height:1,
      padding:10
    }
  })

  let booktime
  if(profile.booktime !== undefined)
    booktime = profile.booktime.map(time =><option value={time.id}>{time.date}</option>)
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
                {/* <h6 className="description text-dark">Description</h6> */}
                <p style={{fontSize:15,fontFamily:'Sans'}}>
                  {profile.description}
                </p>
                <br />
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <Table borderless>
                <tbody>
                  {profile.location &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}} >Location</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">{profile.location}</th>
                    </tr>
                    
                  }
                  {profile.price &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}} >Price</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}} scope="row">Nrs. {profile.price}</th>
                    </tr>
                    
                  }
                  {/* { profile.booktime.length > 0 &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Date</td>
                      <th style={{fontSize:18,fontFamily:'Arial'}}  scope="row">{profile.booktime[0].date}</th>
                    </tr>
                  } */}
                  {profile.interests &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Interests</td>
                      <th  scope="row" style={{fontSize:18,fontFamily:'Arial'}}>{profile.interests}</th>
                    </tr>
                  }
                  {profile.languages &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Languages</td>
                      <th  scope="row" style={{fontSize:18,fontFamily:'Arial'}}>{profile.languages}</th>
                    </tr>
                  }
                  {profile.duration &&
                    <tr>
                      <td style={{fontSize:18,fontFamily:'Arial',}}>Free Time (hrs.)</td>
                      <th  scope="row" style={{fontSize:18,fontFamily:'Arial'}}>{profile.duration}</th>
                    </tr>
                  }

                </tbody>
              </Table>
              {/* <h6 className="title text-dark">Duration (hrs.)
                <br />
                  <p>{profile.duration}</p>
              </h6>
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
              </h6> */}
              <h4 className='text-info font-weight-bold'><strong>Photos</strong></h4> 
              <Gallery photos={items} margin={10}/> 

              </Col>
            </Row>
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
            <label className='text-dark font-weight-bold'>Available Times</label>
            <Input type="select" name="select" id="exampleSelect" style={{marginBottom:20}} onClick={(e) => setUser({...user,timeId:e.target.value})} >
              {booktime}
            </Input >
              {!props.location.fromLocal &&
                <Link to='/checkout' className='btn-round btn-info btn'>
                  Hire
                </Link>
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
