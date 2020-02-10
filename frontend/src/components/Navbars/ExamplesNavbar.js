
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
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import Context from "context/context";

function ExamplesNavbar(props) {

  const {user, setUser} = useContext(Context)
  
  // console.log(props)

  // const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [isDropdownOpen,setIsDropdownOpen ] = useState(false)

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
  console.log(user)
  return (
    <Navbar
      style={{height:50, }}
      className={classnames("fixed-top text-dark")}
      color-on-scroll="300"
      expand="lg"
    >
      <Container style={{marginTop:-20}}>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            // target="_blank"
            title="SahaYatri"
            tag={Link}
          >
            {/* { document.documentElement.scrollTop < 300 ?
              <img
              alt="..."
              className="img-no-padding img-responsive"
              style={{height:40}}
              src={require('assets/img/sahayatri-white.png')}
              /> : */}
              <img
                alt="..."
                className="img-no-padding img-responsive"
                style={{height:40 }}
                src={require('assets/img/sahayatri.png')}
              />
            {/* } */}
            {/* SAHAYATRI */}
          </NavbarBrand>
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
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar className='text-dark'>
            <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' to={{pathname:'/make-offer', type:'event' }}  tag={Link}>
                  <i className="fa fa-male" /> Make an Offer
                </NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' to={{pathname:'/my-offers', type:'event' }}  tag={Link}>
                  <i className="fa fa-hand-pointer-o" /> My Offers
                </NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' to={{pathname:'/my-bookings', type:'event' }}  tag={Link}>
                  <i className="nc-icon nc-cart-simple" /> {' '}My Bookings
                </NavLink>
              </a>
            </NavItem>
            {/* <NavItem>
              <a href='#nth'>
                <NavLink
                  to={{pathname:'/filter', type:'event'}}
                  className='text-dark'
                  tag={Link}
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
            </NavItem> */}
            <NavItem>
              <a href='#nth'>
                <NavLink
                    to={{pathname:'/register-local'}}
                    tag={Link}
                    style={{marginRight:30}}
                    className=" text-center border text-dark"
                  >
                  JOIN AS LOCAL
                </NavLink>
              </a>
            </NavItem>
            { user.isLoggedIn ?
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
              </Dropdown> :
              <NavItem>
                <a href='#nth'>
                  <NavLink
                      to={{pathname:'/register'}}
                      onClick={() => setUser({...user, afterLogin: props.location.pathname}) }
                      tag={Link}
                      style={{marginRight:30}}
                      className=" text-center text-dark"
                    >
                    LOGIN
                  </NavLink>
                </a>
              </NavItem>
            }

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

export default ExamplesNavbar;
