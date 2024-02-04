import React, { useState, useEffect } from 'react';
import "./Home.css"
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setTask, setUsers, setAtask } from '../Store/Action';
import Tasks from './Tasks';



function Home({ status, setStatus , archive }) {
    const dispatch = useDispatch();  
    const tasks = useSelector((state) => state.task);
    const atasks = useSelector((state) => state.atask);
     

    // const tasks = [
    //     { Taskname: "Chennai", Description: "Raj@gmail.com", Assigne: "Raj" },
    //     { Taskname: "Delhi", Description: "Raj@gmail.com", Assigne: "John" },
    //     { Taskname: "Banguluru", Description: "Raja@gmail.com", Assigne: "Sai" },
    //     { Taskname: "Pune", Description: "Raj@gmail.com", Assigne: "Jake" },
    //     { Taskname: "Paisakari", Description: "Raja@gmail.com", Assigne: "Tessa" },
    //     { Taskname: "Alaska", Description: "Raja@gmail.com", Assigne: "Jakob" },
    // ]

    const fetchTask = async () => {
        try {
            const response = await Axios.get("http://localhost:4000/ticket/getTask");
            if (response) {
                dispatch(setTask(response.data.Tasks))
                dispatch(setAtask(response.data.Atasks))
            }
        } catch {
            console.log("error");
        }
    }
    const fetchUsers = async () => {
        try {
            const response = await Axios.get("http://localhost:4000/ticket/getUsers");
            if (response) {
                dispatch(setUsers(response.data))
            }
        } catch {
            console.log("error");
        }
    }
    const deleteTask = async (id) => {
        try {
            const response = await Axios.post("http://localhost:4000/ticket/deleteTask", { id: id });
            if (response) {
                setStatus(!status)
            }
        } catch {
            console.log("error");
        }
    }
    const archiveTask = async (id) => {
       console.log(id,archive);
        try {
            const response = await Axios.post("http://localhost:4000/ticket/archiveTask", { id: id , flag : archive});
            if (response) {
                console.log(response.data);
                setStatus(!status)
            }
        } catch {
            console.log("error");
        }
    }





    useEffect(() => {
        fetchTask()
        fetchUsers()
    }, [status])
  
   





    return (
        <div className='Main'>
           <Tasks tasks ={(archive)?atasks:tasks} deleteTask={deleteTask} archiveTask={archiveTask} archive={archive}/>
        </div>
    );

}

export default Home;