
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import cookie from 'react-cookies'

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
import { get_me } from "api";
// import { my_sathis } from "api";

function ExamplesNavbar(props) {

  const {user, setUser} = useContext(Context)
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [isDropdownOpen,setIsDropdownOpen ] = useState(false)

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  useEffect(() => {
    if(user.isLoggedIn){
      get_me()
      .then(res => {
        let data = res.me
        console.log( data , 'me')
        setUser({...user, name: `${data.firstName} ${data.lastName}`, email:data.email, id:data.id})
      })
      .catch(err => console.log(err))
    }
  },[])
  console.log(user)
  const handleLogout = () => {
    cookie.remove('token')
    setUser({isLoggedIn:false})
  }
  return (
    // <div style={{width:'100%'}}>
    <Navbar
      style={{height:50, width:"100%", paddingRight:10 }}
      className={classnames("fixed-top text-dark")}
      color-on-scroll="300"
      expand="lg"
    >
      <Container style={{marginTop:-20}}>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="SahaYatri"
            tag={Link}
          >
              <img
                alt="..."
                className="img-no-padding img-responsive"
                style={{height:40 }}
                src={require('assets/img/sahayatri.png')}
              />
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
                <NavLink className='text-dark' to='/make-offer' onClick={() => toggleNavbarCollapse()}  tag={Link}>
                  <i className="fa fa-male" /> Make an Offer
                </NavLink>
              </a>
            </NavItem>
            {/* <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' onClick={() => window.location.replace('/my-offers')}  tag={Link}>
                  <i className="fa fa-hand-pointer-o" /> My Offers
                </NavLink>
              </a>
            </NavItem> */}
            {/* <NavItem>
              <a href='#nth'>
                <NavLink className='text-dark' onClick={() => window.location.replace('/my-bookings')}  tag={Link}>
                  <i className="nc-icon nc-cart-simple" /> {' '}My Bookings
                </NavLink>
              </a>
            </NavItem> */}
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
                  <img alt='' src={require('assets/img/default-avatar.png')} style={{borderRadius:'50%', height:20, width:20}} />
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem divider />
                    <DropdownItem header>
                      <Link className='text-uppercase font-weight-bold' onClick={() => handleLogout()}>
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
    // </div>
  );
}

export default ExamplesNavbar;
