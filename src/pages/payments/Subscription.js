import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../../config/config";

function formatDate(isoDateString) {
    if (!isoDateString) return '';

    try {
        const date = new Date(isoDateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } catch (error) {
        console.error('Invalid date:', isoDateString);
        return '';
    }
}

function Subscription() {
    const userDetails = useSelector((state) => state.userDetails);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const subscription = userDetails.subscription;

    const handleCancel = async () => {
        try {
            const response = await axios.post(`${serverEndpoint}/payments/cancel-subscription`, {
                subscription_id: userDetails.subscription?.id
            }, {
                withCredentials: true
            });

            console.log(response);
            setMessage('Subscription cancelled, it can take up to 5 minutes to reflect the status');
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to cancel subscription' });
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)' }}
        >
            <div className="p-5 bg-white rounded-4 shadow-lg text-center w-100" style={{ maxWidth: 500 }}>
                {/* Logo/Icon Placeholder */}
                <div className="mb-4">
                    <span
                        style={{
                            display: 'inline-block',
                            width: 56,
                            height: 56,
                            background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
                            borderRadius: '50%',
                            lineHeight: '56px',
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.21 7 12 3.5 19.79 7 12 9.5zm0 2.5l10-5v6c0 5.25-7 9.5-10 9.5S2 18.25 2 13V7l10 5z" fill="#fff"/>
                        </svg>
                    </span>
                </div>
                {/* Existing content */}
                {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                <div className="card w-100 mb-3 border-0" style={{ boxShadow: 'none' }}>
                    <div className="card-body">
                        <h3 className="card-title mb-3" style={{ fontWeight: 700, color: '#1e293b' }}>Subscription Summary</h3>
                        <hr />
                        <p className="card-text text-start">
                            <div className="pb-2">
                                <strong>Start Date: </strong> {formatDate(subscription.start)}
                            </div>
                            <div className="pb-2">
                                <strong>End Date: </strong> {formatDate(subscription.end)}
                            </div>
                            <div className="pb-2">
                                <strong>Last Payment Date: </strong> {formatDate(subscription.lastBillDate)}
                            </div>
                            <div className="pb-2">
                                <strong>Next Payment Date: </strong> {formatDate(subscription.nextBillDate)}
                            </div>
                            <div className="pb-2">
                                <strong>Total Payments Made: </strong> {subscription.paymentsMade}
                            </div>
                            <div className="pb-2">
                                <strong>Payments Remaining: </strong> {subscription.paymentsRemaining}
                            </div>
                        </p>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-danger w-50" style={{ fontWeight: 600 }} onClick={() => handleCancel()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscription;