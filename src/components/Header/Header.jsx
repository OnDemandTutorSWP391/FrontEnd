import React, { useEffect, useState } from 'react';
import "../assets/css/color.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import "../assets/css/vendor.css";
import useStore from '../../app/store';
import { checkTokenExpiration } from '../../service/Tools';
import { getUserProfile } from '../../service/AccountService';
import { getUserCoin as fetchUserCoin } from '../../service/CoinService';
import LoadScripts from '../../pages/HomePage/LoadScript';

const Header = () => {
    const { setToken, setRefreshToken, isLoggedIn, user, clearToken } = useStore();
    const [userProfile, setUserProfile] = useState({
        avatar: "",
        createdDate: "",
        dob: "",
        email: "",
        fullName: "",
        gender: "",
    });
    const [userCoin, setUserCoin] = useState();
    

    useEffect(() => {
        if (checkTokenExpiration()) {
            clearToken();
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn()) {
            const getRequestCategories = async () => {
                const response = await getUserProfile();
                
                setUserProfile(response.data.data);
            };
            getRequestCategories();
        }
    }, [isLoggedIn()]);

    useEffect(() => {
        if (isLoggedIn()) {
            const fetchCoin = async () => {
                const response = await fetchUserCoin();
                
                setUserCoin(response.data.data); // Assuming 'coins' is the property you need
            };
            fetchCoin();
        }
    }, [isLoggedIn()]);

    return (
        <header>
            <div className="navbar-area">
            <div className="navbar-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-md-left text-center">
                            <ul>
                                <li>
                                    <p><i className="fa fa-map-marker"></i> FPT University - SWP391</p>
                                </li>
                                <li>
                                    <p><i className="fa fa-envelope-o"></i> hoangdn1309@gmail.com</p>
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
                        <a href="/"><img src="/public/img/logo.png" alt="img"/></a>
                    </div>
                    <div className="nav-right-part nav-right-part-mobile">
                    {isLoggedIn() ? (
                            <div>
                                <a href="/profile">Welcome, {userProfile.fullName}</a>
                                
                                    <p> Coin: {userCoin}</p>
                                    {
                                        
                                        
                                    }
                                
                                <button className="btn btn-base" onClick={clearToken}>Logout</button>
                                
                            </div>
                            
                        ) : (
                            <>
                                <a className="signin-btn" href="/login">Sign In</a>
                                <a className="btn btn-base" href="/register">Sign Up</a>
                            </>
                        )}
                        <a className="search-bar" href="#"><i className="fa fa-search"></i></a>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="edumint_main_menu">
                        <ul className="navbar-nav menu-open">
                            <li className="menu-item-has-children current-menu-item">
                                <a href="#">Home</a>
                                <ul className="sub-menu">
                                    <li><a href="/">Home</a></li>
                                    
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#">Course</a>
                                <ul className="sub-menu">
                                    <li><a href="/course-list">Course</a></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#">Deposit</a>
                                <ul className="sub-menu">
                                    <li><a href="/coin-deposit">Coin Deposit</a></li>
                                    
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
                        {isLoggedIn() ? (
                            <div>
                                <a href="/profile">Welcome, {userProfile.fullName}</a>
                                
                                    <p> Coin: {userCoin}</p>
                                    {
                                        
                                        
                                    }
                                
                                <button className="btn btn-base" onClick={clearToken}>Logout</button>
                            </div>
                        ) : (
                            <>
                                <a className="signin-btn" href="/login">Sign In</a>
                                <a className="btn btn-base" href="/register">Sign Up</a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <LoadScripts/>
        </div>

        </header>
        
    );
};

export default Header;
