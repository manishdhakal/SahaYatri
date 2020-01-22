
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="/"
                  target="_blank"
                  className='text-dark'
                >
                  SahaYatri
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  className='text-dark'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  className='text-dark'
                >
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto ">
            <span className="copyright text-dark">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by SahaYatri
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
