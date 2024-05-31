import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../axios/AxiosClient";
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import useStore from '../../app/store';
import { postLogin } from '../../service/AccountService';


 // Adjust the import according to your project structure

const LoginPage = () => {
  const { setToken } = useStore();
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
  
    try {
      const { data, err } = await postLogin(formData);
      if (err) {
        toast.error("Login fail!");
        return;
      }
  
      console.log('Endpoint:', import.meta.env.VITE_API_ENDPOINT + "/Users/SignIn");
      const {accessToken, refreshToken}  = data.data;
      console.log(`${data.data.accessToken}`);
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      useStore.getState().setToken(accessToken); // Update the token in the Zustand store
      
  
      console.log(accessToken);
      navigate("/");
      toast.success("Login success!");
    } catch (err) {
      toast.error("Login failed!");
    }
  };

  return (
    <>
      <div className="breadcrumb-area bg-overlay" style={{ backgroundImage: `url('/public/img/bg/3.png')` }}>
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Sign In</h2>
              <ul className="page-list">
                <li><a href="index.html">Home</a></li>
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
                        onChange={(e) => handleDataChange("email", e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={(e) => handleDataChange("password", e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <button className="btn btn-base w-100" type="submit">Sign In</button>
                  </div>
                  <div className="col-12">
                    <a href="#">Forgotten Your Password?</a>
                    <a href="signup.html"><strong>Signup</strong></a>
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
