import React, { useEffect, useState } from 'react';
import { postForgetPassword, postResetPassword } from '../../service/AccountService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassEnter = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmedNewPassword: '',
    email: email,
    token: token,
  });
  

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const { data, err } = await postResetPassword(formData);
    console.log(formData);
    
    

  }


  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                        <p className="mb-4">
                          We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!
                        </p>
                      </div>
                      <form className="user" onClick={handleResetPassword}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={(e) => handleDataChange('newPassword', e.target.value)}
                          />
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Confirm Password"
                            value={formData.confirmedNewPassword}
                            onChange={(e) => handleDataChange('confirmedNewPassword', e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Reset Password
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="/register">
                          Create an Account!
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="/login">
                          Already have an account? Login!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassEnter;
