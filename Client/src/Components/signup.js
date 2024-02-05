import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({page}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        admin: false
    })
    const [registerStatus, setRegisterStatus] = useState("");
  
    const handleChange = (e) => {
        if (e.target.name === "admin") {
            setUser({
                ...user,
                admin: e.target.checked
            });
        }
        else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            });
        };
    }

    const register = (e) => {
        console.log(user);
        e.preventDefault();
        Axios.post("https://ticketapps1.onrender.com/ticket/register", {
            email: user.email,
            name: user.name,
            password: user.password,
            admin: user.admin
        }).then((response) => {
            setRegisterStatus(response.data.message);
            navigate("/")
        }).catch((error) => {
            setRegisterStatus('Registration failed. Please try again.');
        }).finally(() => {
            setTimeout(() => {
                setRegisterStatus('');
            }, 1000);
        });
    }

    let imgs = [
        'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg',
    ];
    return (
        <div className="container" style={{ paddingTop: 60 }}>

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                        <form>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
                            </div>
                            <p>
                      <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
                  </p>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="name"
                                    onChange={handleChange} placeholder="Enter your Name" required
                                />
                                <label className="form-label">Name</label>
                            </div>
                           
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    onChange={handleChange} placeholder="Enter your Email Address" required
                                />
                                <label className="form-label">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    onChange={handleChange} placeholder="Enter your Password" required
                                />
                                <label className="form-label">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" name="admin" value="" onChange={handleChange} />
                                    <label className="form-check-label">
                                        Admin
                                    </label>
                                </div>
                                {/* <a href="#" className="text-body">Forgot password?</a> */}
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg" onClick={register}>Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a onClick={()=>navigate("/login")} className="link-danger">Login</a></p>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={imgs[0]} className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;