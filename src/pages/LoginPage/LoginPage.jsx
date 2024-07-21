import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useStore from "../../app/store";
import { postLogin } from "../../service/AccountService";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { setToken, setRefreshToken, isLoggedIn, user } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const { data, err } = await postLogin(formData);
    if (err) {
      toast.error("Login failed!");
      return;
    }

    const { accessToken, refreshToken } = data.data;

    setToken(accessToken); // Update the token in the Zustand store
    setRefreshToken(refreshToken);

    if (isLoggedIn()) {
      toast.success("Login successful!");
    } else {
      toast.error("Login error");
    }
  };

  const role =
    user &&
    user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  useEffect(() => {
    if (isLoggedIn()) {
      if (role === 'Moderator') {
        navigate('/moderator');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <>
      <div
        className="breadcrumb-area bg-overlay"
        style={{ backgroundImage: `url('/public/img/bg/3.png')` }}
      >
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Sign In</h2>
              <ul className="page-list">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Sign In</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="signin-page-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <form className="signin-inner" onSubmit={handleLogin}>
                <div className="row">
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          handleDataChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          handleDataChange("password", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <button className="btn btn-base w-100" type="submit">
                      Sign In
                    </button>
                    <ToastContainer />
                  </div>
                  <div className="col-12">
                    <a href="/forget-password">Forgotten Your Password?</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
