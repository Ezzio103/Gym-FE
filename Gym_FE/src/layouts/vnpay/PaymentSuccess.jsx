import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState(null);
    // const history = useHistory();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        console.log(query.toString())
        // const status = query.get('vnp_ResponseCode');
        // const amount = query.get('vnp_Amount');
        // const txnRef = query.get('vnp_TxnRef');

        const fetchPaymentInfo = async () => {
            try {
                // console.log(status,amount,txnRef)
                const response = await fetch(`http://localhost:8080/vnpay/payment_info?${query}`);
                if (response.ok) {
                    // const data = await response.json();
                    // setPaymentInfo(data);
                    // Chuyển hướng sau khi nhận thông tin thanh toán
                    
                    const paymentStatusText = document.querySelector('.payment-status-text');
                    if (paymentStatusText) {
                        paymentStatusText.textContent = 'Payment Successful!';
                    }
                    setTimeout(() => {
                        
                        navigate("/");
                        // history.push('/');
                    }, 5000); // Chuyển hướng sau 3 giây
                    
                } else {
                    console.error('Payment failed');
                }
            } catch (error) {
                console.error('Error fetching payment info', error);
            }
        };

        fetchPaymentInfo();
    }, [location]);

    return (
        <div>
            <h3 className='payment-status-text ' style={{textAlign:'center', marginTop:'50px'}}>Processing payment...</h3>
            {paymentInfo && (
                <div>
                    <h3 >Payment Information:</h3>
                    <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
