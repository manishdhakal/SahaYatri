
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
            title="SahaYatri"
          >
              <a href='/'>
              <img
                alt="..."
                className="img-no-padding img-responsive"
                style={{height:40}}
                src={require('assets/img/sahayatri.png')}
              />
              </a>
          </NavbarBrand>
          </div>
      </Container>
    </Navbar>
  );
}

export default LocalNavbar;
