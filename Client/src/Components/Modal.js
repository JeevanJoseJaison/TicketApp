import React, { useState, useEffect } from 'react';
import './Modal.css';
import { Close } from '../Icons/icons';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, setModalOpen ,status, setStatus}) => {
    const users = useSelector((state) => state.users);
    const userName = useSelector((state) => state.userName);
    const [closeHover, setcloseHover] = useState(false)
    const [empty, setEmpty] = useState({ "Name": false, "Description": false, "Assigne": false })
    const [data, setData] = useState({ "Name": "", "Description": "", "Assigne": "" })
    const input = ["Name", "Description"]
    
    const loginStatus = useSelector((state)=>state.status)
console.log(loginStatus);

    if (!isOpen) return null;
    const closeModal = () => {
        setModalOpen(false);
        const updatedEmpty = Object.fromEntries(
            Object.keys(empty).map(key => [key, false])
        );

        setEmpty(updatedEmpty);
        setData({ "Name": "", "Description": "", "Assigne": "" })
    };

    const handleSubmit = () => {
        if(data.Assigne && data.Name && data.Description)
        updateData();
      
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (!value) {
            setEmpty({
                ...empty, [name]: true
            })

        }
        else {
            console.log(name, value);
            setEmpty({
                ...empty, [name]: false
            })
            setData({
                ...data,
                [name]: value
            })

        }


    };

    const handleAssigne =(e)=>{
        const { value } = e.target;
        setData({...data, Assigne : value})
    }





    const updateData = () => {

        Axios.post("https://ticketapps1.onrender.com/ticket/addTask", {
            name: data.Name,
            desc: data.Description,
            assigne: data.Assigne
        }).finally(()=>{
            setStatus(!status);
            closeModal();
        })





    };
    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modalheader'>
                    <div>Add Task</div>
                    <button onClick={closeModal} className='closebutton' onMouseEnter={() => setcloseHover(true)} onMouseLeave={() => setcloseHover(false)}>
                        <span><i><Close fill={closeHover ? 'black' : "#555"} /></i></span></button>
                </div>
                <div className='modalbody'>
                    <form className='modalform'>

                        {input.map(item => (
                            <div className='formitem'>
                                <div className='formlabel'>
                                    <label title={item}>
                                        <a>*</a>{item}:
                                    </label>
                                </div>
                                <div className='forminput'>
                                    <div className={(empty[item]) ? "emptyfield" : "nonempty"}>
                                        <span> <input type='text' name={item} onChange={(e) => handleInputChange(e)}
                                        />
                                        </span>
                                        {empty[item] && <div className="explain">This field is required</div>}
                                    </div>
                                </div>
                            </div>

                        ))}
                        <select name="Assigne" onChange={(e) => handleAssigne(e)}>
                            <option value="" >
                                Assigne
                            </option>
                            {(userName.Admin === 1) ? (users.map((user) => (<option  value={user}>{user}</option>))) : <option  value={userName.Username}>{userName.Username}</option>}

                        </select>

                    </form>
                </div>
                <div className='modalfooter'>
                    <div className="footerbutton">
                        <button onClick={closeModal} >Close</button>
                        <button onClick={handleSubmit}>OK</button>
                    </div>

                </div>


            </div>

        </div >
    );
};

export default Modal;
