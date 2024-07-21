import React, { useEffect } from "react";
import "../assets/css/color.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import "../assets/css/vendor.css";
import LoadScripts from "../../pages/HomePage/LoadScript";

const Footer = () => {
  return (
    <>
      <footer className="footer-area bg-gray">
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 align-self-center">
                2024@FPT.EDU.COM
              </div>
              <div className="col-lg-4  col-md-6 order-lg-12 text-md-right align-self-center">
                <ul className="social-media mt-md-0 mt-3">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="youtube" href="#">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a className="pinterest" href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 order-lg-8 text-lg-center align-self-center mt-lg-0 mt-3"></div>
            </div>
          </div>
          <LoadScripts />
        </div>
      </footer>
    </>
  );
};

export default Footer;
