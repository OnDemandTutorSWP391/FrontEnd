import "../assets/css/color.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import "../assets/css/vendor.css";
import useStore from "../../app/store";
import { checkTokenExpiration } from "../../service/Tools";
import { getUserProfile } from "../../service/AccountService";
import { getUserCoin as fetchUserCoin } from "../../service/CoinService";
import LoadScripts from "../../pages/HomePage/LoadScript";
import { useContext, useEffect, useState } from "react";
import useToggleStore from "./useToggleStore";
import { Link } from "react-bootstrap/lib/Navbar";

const Header = () => {
  const { isLoggedIn, user, clearToken } = useStore();
  const [userProfile, setUserProfile] = useState({
    avatar: "",
    createdDate: "",
    dob: "",
    email: "",
    fullName: "",
    gender: "",
  });
  const [userCoin, setUserCoin] = useState();
  const { isActive, toggle } = useToggleStore();
  console.log(isActive);
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
        setUserCoin(response.data.data);
      };
      fetchCoin();
    }
  }, [isLoggedIn(), isActive]);

  const getUserLink = () => {
    const role =
      user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    switch (role) {
      case "Student":
        return "/profile";
      case "Tutor":
        return "/tutor";
      case "Moderator":
        return "/moderator";
      case "Admin":
        return "/admin";
      default:
        return "/profile";
    }
  };

  return (
    <header>
      <div className="navbar-area">
        <div className="row bg-white">
          <div className="col-md-1"></div>
          <div className="col-md-3  h-14 flex items-center">
            {isLoggedIn() && (
              <a href={getUserLink()} className="text-3xl">
                Welcome, {userProfile.fullName}
              </a>
            )}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-1"></div>
          <div className="col-md-1"></div>

          <div className="col-md-1 flex justify-end">
            {isLoggedIn() ? (
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={userProfile.avatar}
                alt="User Avatar"
              />
            ) : (
              <a
                className="no-underline text-black !flex !justify-center !items-center"
                href="/login"
              >
                Sign In
              </a>
            )}
          </div>
          <div className="col-md-1 h-14">
            {isLoggedIn() ? (
              <p className=" !h-14 !flex !justify-start !items-center">
                Coin: {userCoin}
              </p>
            ) : (
              <a
                className="btn btn-base !flex !justify-center !items-center"
                href="/register"
              >
                Sign Up
              </a>
            )}
          </div>
          <div className="col-md-1">
            {isLoggedIn() && (
              <a
                onClick={clearToken}
                className="btn btn-base !flex !justify-center !items-center"
              >
                Logout
              </a>
            )}
          </div>
        </div>
        <div className="navbar-top">
          <div className="container">
            <div className="row">
              <div className="col-md-8 text-md-left text-center">
                <ul>
                  <li>
                    <p>
                      <i className="fa fa-map-marker"></i> FPT University -
                      SWP391
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fa fa-envelope-o"></i> hoangdn1309@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="topbar-right text-md-right text-center">
                  <li className="social-area">
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar bg-white navbar-area-1 navbar-area navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button
                className="menu toggle-btn d-block d-lg-none"
                data-target="#edumint_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-left"></span>
                <span className="icon-right"></span>
              </button>
            </div>
            <div className="logo">
              <a href="/">
                <img src="/public/img/logo.png" alt="img" />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="edumint_main_menu">
              <ul className="navbar-nav menu-open">
                <li className="menu-item-has-children current-menu-item">
                  <a href="#">Home</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="/">Home</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#">Course</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="/course-list">Course</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#">Deposit</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="/coin-deposit">Coin Deposit</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/create-request">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <LoadScripts />
      </div>
    </header>
  );
};

export default Header;
