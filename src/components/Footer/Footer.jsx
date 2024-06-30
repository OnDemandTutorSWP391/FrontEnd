import React, { useEffect } from 'react'
import "../assets/css/color.css"
import "../assets/css/responsive.css"
import "../assets/css/style.css"
import "../assets/css/vendor.css"
import LoadScripts from '../../pages/HomePage/LoadScript'

const Footer = () => {
    
  return (<>
  
    <footer className="footer-area bg-gray">
        <div className="footer-subscribe">
            <div className="container">
                <form className="footer-subscribe-inner">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="single-input-inner style-border-bottom">
                                <input type="text" placeholder="Your Full Name"/>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="single-input-inner style-border-bottom">
                                <input type="text" placeholder="Your Email Address"/>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <a className="btn btn-base" href="#">Subscribe</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="widget widget_contact">
                            <h4 className="widget-title">Contact Us</h4>
                            <ul className="details">
                                <li><i className="fa fa-map-marker"></i> 420 Love Sreet 133/2 Street NewYork</li>
                                <li><i className="fa fa-envelope"></i> info.contact@gmail.com</li>
                                <li><i className="fa fa-phone"></i> 012 345 678 9101</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="widget widget_nav_menu">
                            <h4 className="widget-title">Course</h4>
                            <ul>
                                <li><a href="course.html">Branding design</a></li>
                                <li><a href="course.html">Ui/Ux designing </a></li>
                                <li><a href="course.html">Make Elements</a></li>
                                <li><a href="course.html">Business</a></li>
                                <li><a href="course.html">Graphics design</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="widget widget_blog_list">
                            <h4 className="widget-title">News & Blog</h4>
                            <ul>
                                <li>
                                    <h6><a href="blog-details.html">Big Ideas Of Business Branding Info.</a></h6>
                                    <span className="date"><i className="fa fa-calendar"></i>December 7, 2021</span>
                                </li>
                                <li>
                                    <h6><a href="blog-details.html">Ui/Ux Ideas Of Business Branding Info.</a></h6>
                                    <span className="date"><i className="fa fa-calendar"></i>December 7, 2021</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="widget widget_contact">
                            <h4 className="widget-title">Twitter Feed</h4>
                            <ul className="details">
                                <li>
                                    <i className="fa fa-twitter"></i>
                                    Simply dummy brand <a href="#">https//tweets/c3l.com</a>
                                    <div className="time">9 Hours ago</div>
                                </li>
                                <li>
                                    <i className="fa fa-twitter"></i>
                                    Simply dummy brand <a href="#">https//tweets/c7l.com</a>
                                    <div className="time">9 Hours ago</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 align-self-center">
                        <a href="index.html"><img src="/public/img/footer-logo.png" alt="img"></img></a>
                    </div>
                    <div className="col-lg-4  col-md-6 order-lg-12 text-md-right align-self-center">
                        <ul className="social-media mt-md-0 mt-3">
                            <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a className="instagram" href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a className="youtube" href="#"><i className="fa fa-youtube"></i></a></li>
                            <li><a className="pinterest" href="#"><i className="fa fa-pinterest"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 order-lg-8 text-lg-center align-self-center mt-lg-0 mt-3">
                        <p>copyright 2022 by solverwp.com</p>
                    </div>
                </div>
            </div>
            <LoadScripts/>
        </div>
    </footer>
    </>
    
  )
  
}

export default Footer