import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { postDeposit } from '../../service/CoinService';
import { useNavigate } from 'react-router-dom';
import { ResetTvSharp } from '@mui/icons-material';

const CoinDeposit = () => {
    const [formData, setFormData] = useState({
        coin: "",
    });
    const navigate = useNavigate();

    const handleDataChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
        console.log(formData);
    };

    const handleDeposit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

       

        const response = await postDeposit(formData.coin); // Use dataToSend
        console.log(response);

        if (response.data && response.data.paymentUrl) {
            console.log(response);
            window.location.href = response.data.paymentUrl;
            if(response.status(200)){
                console.log("ok");

            }else{
                console.log("!ok");
            }
          } else {
            toast.error("Không thể bắt đầu thanh toán");
          }
    };

    return (
        <div>
            <div className="breadcrumb-area bg-overlay" style={{ backgroundColor: "#143254" }}>
                <div className="container">
                    <div className="breadcrumb-inner">
                        <div className="section-title mb-0 text-center">
                            <h2 className="page-title">Deposit</h2>
                            <ul className="page-list">
                                <li><a href="/">Home</a></li>
                                <li>Deposit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signin-page-area pd-top-120 pd-bottom-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7">
                            <form className="signin-inner" onSubmit={handleDeposit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="single-input-inner style-bg-border">
                                            Nhập số coin bạn muốn nạp
                                            <input 
                                                type="number" 
                                                placeholder="Enter coin" 
                                                value={formData.coin}
                                                onChange={(e) => handleDataChange("coin", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="single-input-inner style-bg-border d-flex align-items-center">
                                            Phương thức thanh toán:
                                            <input 
                                                type="text" 
                                                placeholder="VNPAY" 
                                                disabled 
                                                style={{ marginLeft: '10px', flexGrow: 1 }}
                                            />
                                            <img 
                                                src="/public/images/download-logo-vnpayqr-mien-phi.jpg" 
                                                alt="VNPAY" 
                                                style={{ marginLeft: '10px', height: '60px', width: '60px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <button className="btn btn-base w-100" type="submit">Deposit</button>
                                        <ToastContainer />
                                    </div>
                                    <div className="col-12">
                                        <p>Bằng việc nhấn Deposit, bạn chấp nhận chính sách của chúng tôi</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDeposit
