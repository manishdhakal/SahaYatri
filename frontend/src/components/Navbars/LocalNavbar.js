
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from "reactstrap";
import Context from "context/context";

function LocalNavbar(props) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const {user, setUser} = useContext(Context)
  
  console.log(user)

  // const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  // React.useEffect(() => {
  //   const updateNavbarColor = () => {
  //     if (
  //       document.documentElement.scrollTop > 299 ||
  //       document.body.scrollTop > 299
  //     ) {
  //       setNavbarColor("");
  //     } else if (
  //       document.documentElement.scrollTop < 300 ||
  //       document.body.scrollTop < 300
  //     ) {
  //       setNavbarColor("navbar-transparent");
  //     }
  //   };

  //   window.addEventListener("scroll", updateNavbarColor);

  //   return function cleanup() {
  //     window.removeEventListener("scroll", updateNavbarColor);
  //   };
  // });
  return (
    <Navbar
      style={{height:70}}
      className={classnames("fixed-top text-dark")}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            // to="/"
            // target="_blank"
            title="SahaYatri"
            // tag={Link}
          >
            {/* { document.documentElement.scrollTop < 300 ?
              <img
              alt="..."
              className="img-no-padding img-responsive"
              style={{height:40}}
              src={require('assets/img/sahayatri-white.png')}
              /> : */}
              <a href='/'>
              <img
                alt="..."
                className="img-no-padding img-responsive"
                style={{height:40}}
                src={require('assets/img/sahayatri.png')}
              />
              </a>
            {/* } */}
            {/* SAHAYATRI */}
          </NavbarBrand>
          {
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
          }
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={true}
        >
          <Nav navbar className='text-dark'>
            <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' to={{}}  tag={Link}>
                  <i className="fa fa-male" /> Add Events
                </NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href='#nth'>
                <NavLink
                  onClick={toggleNavbarCollapse}
                  className='text-dark'
                  tag={Link}
                  href="#"
                >
                  <i className="nc-icon nc-pin-3" /> Local Events
                </NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href='#nth'>
                <NavLink
                  className='text-dark'
                  to={{pathname:'/filter', type:'food'}}
                  tag={Link}
                >
                  <i className="fa fa-coffee" /> Cook {'&'} Dine
                </NavLink>
              </a>
            </NavItem>
            <Dropdown nav isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)}>
                <a href='#nth'>
                  <DropdownToggle nav caret className='text-dark'> 
                  <img alt='' src={require('assets/img/faces/kaci-baum-2.jpg')} style={{borderRadius:'50%', height:20, width:20}} />
                          {` Manish Dhakal`}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={{pathname:'/user/'+ String(user.id)}} className='text-uppercase font-weight-bold' >
                        Manish Dhakal
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>
                      <Link className='text-uppercase font-weight-bold' to={{pathname:'/'}} onClick={() => setUser({...user, isLoggedIn:false, isLocalApproved:false})}>
                        LOGOUT
                      </Link>
                      </DropdownItem>
                  </DropdownMenu>
                </a>
              </Dropdown>
            {/* <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <InputGroup>
                <Input placeholder="Search" type="search" className='bg-transparent' color='neutral' />
                <InputGroupAddon addonType="apppend">
                  <InputGroupText className='bg-transparent'>
                    <i className="fa fa-search" />
                  </InputGroupText> 
                </InputGroupAddon> 
              </InputGroup>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default LocalNavbar;
