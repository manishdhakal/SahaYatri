
import React from "react";

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
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title text-dark">
                Arman Chhetri <br />
              </h4>
              <h6 className="description text-dark">Companion</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center text-dark" md="6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis.
              </p>
              <br />
              {/* <Button className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Settings
              </Button> */}
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active text-dark" : "" }
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <h5><b>Details</b></h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active text-dark" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    <h5><b>History</b></h5>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="card-profile" activeTab={activeTab}>
            <TabPane tabId="1" className='text-center ml-auto mr-auto'>
              <Row className='mx-auto'>
                <Col className='text-dark text-right'>
                  {/* <h6>Name</h6> */}
                  <i className='fa fa-user-circle' />
                </Col>  
                <Col className='text-dark text-left'>
                  <b>Manish Dhakal</b>
                </Col>
              </Row>
              <Row className='mx-auto'>
                <Col className='text-dark text-right'>
                  {/* <h6>Phone</h6> */}
                  <i className='fa fa-phone' />
                </Col>  
                <Col className='text-dark text-left'>
                  <b>9860687860</b>
                </Col>
              </Row>
              <Row className='mx-auto'>
                <Col className='text-dark text-right'>
                  {/* <h6>Email</h6> */}
                  <i className='nc-icon nc-email-85' />
                </Col>  
                <Col className='text-dark text-left'>
                  <b>mns.dkl19@gmail.com</b>
                </Col>
              </Row>
              <Row className='mx-auto'>
                <Col className='text-dark text-right'>
                  {/* <h6>Location</h6> */}
                  <i className='nc-icon nc-pin-3' />
                </Col>  
                <Col className='text-dark text-left'>
                  <b>Lalitpur</b>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h3 className="text-muted">No History Yet !!</h3>
              <Button className="btn-round" color="warning">
                Find artists
              </Button>
            </TabPane>
          </TabContent>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
