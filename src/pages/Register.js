import { useState } from "react";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/actions";

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.username.length === 0) {
            newErrors.username = "Username is mandatory";
            isValid = false;
        }

        if (formData.password.length === 0) {
            newErrors.password = "Password is mandatory";
            isValid = false;
        }

        if (formData.name.length === 0) {
            newErrors.name = "Name is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                username: formData.username,
                password: formData.password,
                name: formData.name
            };
            const configuration = {
                withCredentials: true
            };
            try {
                const response = await axios.post(
                    `${serverEndpoint}/auth/register`,
                    body, configuration);
                dispatch({
                    type: SET_USER,
                    payload: response.data.user
                });

            } catch (error) {
                if (error?.response?.status === 401) {
                    setErrors({ message: 'User exist with the given email' });
                } else {
                    setErrors({ message: 'Something went wrong, please try again' });
                }
            }
        }
    };

    const handleGoogleSignin = async (authResponse) => {
        try {
            const response = await axios.post(`${serverEndpoint}/auth/google-auth`, {
                idToken: authResponse.credential
            }, {
                withCredentials: true
            });

            dispatch({
                type: SET_USER,
                payload: response.data.userDetails
            });
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Something went wrong while google signin' });
        }
    };

    const handleGoogleSigninFailure = async (error) => {
        console.log(error);
        setErrors({ message: 'Something went wrong while google signin' });
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
        >
            <div className="p-5 bg-white rounded-4 shadow-lg text-center" style={{ maxWidth: 400, width: '100%' }}>
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
                <h2 className="mb-4" style={{ fontWeight: 700, color: '#1e293b' }}>Sign up with a new account</h2>
                {/* Error Alert */}
                {errors.message && (
                    <div className="alert alert-danger" role="alert">
                        {errors.message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">
                                {errors.username}
                            </div>
                        )}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="d-grid mb-2">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', border: 'none', fontWeight: 600 }}>
                            Submit
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <div className="my-4 d-flex align-items-center text-muted">
                        <hr className="flex-grow-1" />
                        <span className="px-2">OR</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleGoogleSignin}
                            onError={handleGoogleSigninFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    );
}

export default Register;