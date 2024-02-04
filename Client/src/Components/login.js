import React, { useState, useEffect } from "react";
import Axios from "axios";
import loginimg from './login.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import { setUserName ,setStatus} from "../Store/Action"


const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState(false);
    const loginStatus = useSelector((state)=>state.status)
  

    const login = async() => {

        try {
            const response = await Axios.post("http://localhost:4000/ticket/login", {
                email: email,
                password: password,
            });
            if (response.data) {
                console.log(response.data);
                dispatch(setUserName(response.data))
                dispatch(setStatus(true)) 
                navigate("/");               
            }
        } catch {
            setWarning(true)
        } finally {
            setTimeout(() => {
                setWarning(false)
            }, 1000);
        }
    }


    return (
        <div className="container" style={{ paddingTop: 60 }}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={loginimg} className="img-fluid" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Login to your account</p>
                            </div>
                            <p>
                                {(warning) && (<h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>Wrong Credential</h1>
                                )}</p>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email" required
                                />
                                <label className="form-label">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required
                                />
                                <label className="form-label">Password</label>
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">
                   
                    <a href="#" className="text-body">Forgot password?</a>
                  </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg" onClick={login}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="signup" className="link-danger">Sign Up</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;