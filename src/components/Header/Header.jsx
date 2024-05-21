import React, { useEffect } from 'react'
import "../assets/css/color.css"
import "../assets/css/responsive.css"
import "../assets/css/style.css"
import "../assets/css/vendor.css"
const Header = () => {
    
    
  return (
    <div className="navbar-area">
        
        <div className="navbar-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 text-md-left text-center">
                        <ul>
                            <li>
                                <p><i className="fa fa-map-marker"></i> 2072 Pinnickinick Street, WA 98370</p>
                            </li>
                            <li>
                                <p><i className="fa fa-envelope-o"></i> info@website.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="topbar-right text-md-right text-center">
                            <li className="social-area">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar bg-white navbar-area-1 navbar-area navbar-expand-lg">
            <div className="container nav-container">
                <div className="responsive-mobile-menu">
                    <button className="menu toggle-btn d-block d-lg-none" data-target="#edumint_main_menu"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-left"></span>
                        <span className="icon-right"></span>
                    </button>
                </div>
                <div className="logo">
                    <a href="index.html"><img src="/public/img/logo.png" alt="img"/></a>
                </div>
                <div className="nav-right-part nav-right-part-mobile">
                    <a className="signin-btn" href="/login">Sign In</a>
                    <a className="btn btn-base" href="signup.html">Sign Up</a>
                    <a className="search-bar" href="#"><i className="fa fa-search"></i></a>
                </div>
                <div className="collapse navbar-collapse" id="edumint_main_menu">
                    <ul className="navbar-nav menu-open">
                        <li className="menu-item-has-children current-menu-item">
                            <a href="#">Home</a>
                            <ul className="sub-menu">
                                <li><a href="index.html">Home 01</a></li>
                                <li><a href="index-2.html">Home 02</a></li>
                                <li><a href="index-3.html">Home 03</a></li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <a href="#">Course</a>
                            <ul className="sub-menu">
                                <li><a href="course.html">Course</a></li>
                                <li><a href="course-details.html">Course Single</a></li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <a href="#">Pages</a>
                            <ul className="sub-menu">
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="event.html">Event</a></li>
                                <li><a href="event-details.html">Event Details</a></li>
                                <li><a href="team.html">Instructor</a></li>
                                <li><a href="team-details.html">Instructor Details</a></li>
                                <li><a href="pricing.html">Pricing</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                                <li><a href="login">Sign In</a></li>
                                <li><a href="signup.html">Sign Up</a></li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <a href="#">Blog</a>
                            <ul className="sub-menu">
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="blog-grid.html">Blog Grid</a></li>
                                <li><a href="blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div className="nav-right-part nav-right-part-desktop">
                    <a className="signin-btn" href="login">Sign In</a>
                    <a className="btn btn-base" href="signup.html">Sign Up</a>
                    <a className="search-bar" href="#"><i className="fa fa-search"></i></a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header