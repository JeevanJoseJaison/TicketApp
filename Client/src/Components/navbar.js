import React from "react";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setModalOpen, setLoginStatus, setArchive, archive }) => {

    const loginStatus = useSelector((state) => state.status)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Ticket App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {(loginStatus) ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {(archive) ? <a className="nav-link active" style={{ cursor: 'pointer' }} aria-current="page" onClick={(e) => setArchive(false)} >Home</a> :
                                <a className="nav-link active" aria-current="page" style={{ cursor: 'pointer' }} onClick={(e) => setArchive(true)} >Archive</a>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" style={{ cursor: 'pointer' }} onClick={(e) => setModalOpen(true)} >Add Task</a>
                        </li>
                    </ul> : <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>}
                    <div className="d-flex">
                        {(loginStatus) ? <a className="btn btn-outline-primary" href="/login">Sign Out</a> :
                            <a className="btn btn-outline-primary" href="signup">Sign Up</a>}
                    </div>
                    <div className="d-flex">

                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;