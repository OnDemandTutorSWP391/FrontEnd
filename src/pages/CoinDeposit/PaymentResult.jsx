import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postConfirmDeposit } from '../../service/CoinService';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        
        const dataToSend = {
          success: params.get('success') === 'True',
          message: decodeURIComponent(params.get('message') || ''),
          data: {
            paymentMethod: params.get('paymentMethod'),
            orderDescription: decodeURIComponent(params.get('orderDescription') || ''),
            orderId: params.get('orderId'),
            transactionId: params.get('transactionId'),
            token: params.get('token'),
            vnPayResponseCode: params.get('vnPayResponseCode'),
            amount: params.get('amount'),
          },
        };

        console.log('Data to send:', dataToSend);

        const response = await postConfirmDeposit(dataToSend);
        navigate('/')
        console.log('API Response:', response.data);
        setPaymentResult(response.data);
      } catch (error) {
        console.error('Error confirming payment:', error);
        setError(error.message || 'An error occurred while confirming the payment');
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [location.search]);

  if (isLoading) {
    return <div>Processing payment result...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Payment Result</h1>
      {paymentResult && (
        <div>
          <p>Status: {paymentResult.success ? 'Success' : 'Failure'}</p>
          <p>Message: {paymentResult.message}</p>
          {/* Hiển thị thêm thông tin khác từ paymentResult nếu cần */}
        </div>
      )}
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default PaymentResult;