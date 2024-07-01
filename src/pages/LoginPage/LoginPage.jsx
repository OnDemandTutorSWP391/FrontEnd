import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../axios/AxiosClient";
import { ToastContainer, toast } from 'react-toastify';
import useStore from '../../app/store';
import { postLogin } from '../../service/AccountService';
import 'react-toastify/dist/ReactToastify.css';


 // Adjust the import according to your project structure

const LoginPage = () => {
  const { setToken, setRefreshToken, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [isLogged, setLogged] = useState(false)
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
        toast.error("Login fail!");
        return;
      }
  
      console.log('Endpoint:', import.meta.env.VITE_API_ENDPOINT + "/Users/SignIn");
      const {accessToken, refreshToken}  = data.data;
      console.log(`${data.data.accessToken}`);
  
      
      setToken(accessToken) // Update the token in the Zustand store
      setRefreshToken(refreshToken);
      useStore.getState().setRef
      console.log(accessToken);
      if (isLoggedIn()) {
        
        navigate("/");

        toast.success("Login success!");
      }else {
        toast.error("error")
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
                    <ToastContainer />
                  </div>
                  <div className="col-12">
                    <a href="/forget-password">Forgotten Your Password?</a>
                    <a href="/register"><strong>Signup</strong></a>

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