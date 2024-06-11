import React, { useState } from 'react';
import { postRegister } from '../../service/AccountService';
import { ToastContainer, toast } from 'react-toastify'; // Make sure to install and import react-toastify
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    identityCard: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    avatar: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const response = await postRegister(formData); // Use formData directly
    console.log(response);

    if (response.err) {
      toast.error("Registration failed");
    } else {
      navigate("/login")
      toast.success("Registration successful");
    }
    // handle response
  };

  return (
    <div>
      <div className="breadcrumb-area bg-overlay" style={{ backgroundImage: "url('assets/img/bg/3.png')" }}>
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Sign Up</h2>
              <ul className="page-list">
                <li><a href="index.html">Home</a></li>
                <li>Sign Up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="signup-page-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <form className="signin-inner" onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Full Name" onChange={(e) => handleDataChange("fullName", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Email" onChange={(e) => handleDataChange("email", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="password" placeholder="Password" onChange={(e) => handleDataChange("password", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="password" placeholder="Confirm Password" onChange={(e) => handleDataChange("confirmedPassword", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Identity Card" onChange={(e) => handleDataChange("identityCard", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="date" placeholder="DOB" onChange={(e) => handleDataChange("dob", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Phone Number" onChange={(e) => handleDataChange("phoneNumber", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <select onChange={(e) => handleDataChange("gender", e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <input type="text" placeholder="Avatar URL" onChange={(e) => handleDataChange("avatar", e.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <select onChange={(e) => handleDataChange("role", e.target.value)}>
                        <option value="">Are You a Tutor or Student?</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <button className="btn btn-base w-100" type="submit">Create Account</button>
                    <ToastContainer/>
                  </div>
                  <div className="col-12">
                    <span>By creating an account</span>
                    <a href="/login"><strong>Signin</strong></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
