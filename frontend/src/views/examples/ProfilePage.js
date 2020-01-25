
import React from "react";

import url from 'url.js'
import Gallery from "react-photo-gallery";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from 'axios'

function ProfilePage(props) {

  const id = props.match.params.id
  console.log(url+'/api/sathi/'+id)
  
  const [user, setUser] = React.useState({});
  // if(user !== undefined){
  //   var image = user[0].slice(0, 3)
  //   var items = image.map(img => {
  //     return {
  //       src: url + img,
  //       width: 4,
  //       height: 3
  //     }
  //   })
  // }

  const [activeTab, setActiveTab] = React.useState("1");
  

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {


    axios.get(url+'/api/sathi/'+id).then(e => console.log(e))
    document.body.classList.add("/");
    return function cleanup() {
      document.body.classList.remove("/");
    };
  },[]);
  
  console.log(user)
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
                  // src={url + user[0][0]}
                />
              </div>
              <div className="name">
                <h2 className="title text-dark">
                  {user[1].name} <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center text-dark" md="6">
                <h6 className="description text-dark">Description</h6>
                <p>
                  {user[1].description}
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
                  <p>{user[1].languages}</p>
                </h6>

                <h6 className="title text-dark">Interests
                <br />
                  <p>{user[1].interests}</p>
                </h6>

                <h6 className="title text-dark">Location
                <br />
                  <p>{user[1].places}</p>
                </h6>
                <h4><strong>Photos</strong></h4>
              {/* <Gallery photos={items}/>  */}

              </Col>
            </Row>
            <br />
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <Button className="btn-round w-25 h6 font-weight-bold" color="primary">
                Hire Now
              </Button>
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
