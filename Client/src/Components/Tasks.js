import React, { useState, useEffect } from 'react';
import "./Home.css"
import { Edit, Delete, Archive, Filter , Unarchive } from '../Icons/icons';
import { useSelector } from 'react-redux';



function Tasks({ tasks, deleteTask ,archiveTask ,archive}) {
    const userName = useSelector((state) => state.userName);


    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 5;
    const totalPages = Math.ceil(tasks.length / itemsPerPage);


    const handleSort = (column) => {
        setSortBy(column);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = (id) => {
        console.log(id);
        deleteTask(id);

    }


    const filteredTasks = tasks.filter(task =>
        task.Taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.Assigne.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTasks = sortBy
        ? filteredTasks.slice().sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : filteredTasks;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleTasks = sortedTasks.slice(startIndex, endIndex);

    const handleArchive = (id) => {
        archiveTask(id)
    }

    return (
        <div className='Home'>
            <input
                type="text"
                placeholder="Search by Task Name or Assignee"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th className="iconColumnHeader">Assignee<span onClick={() => handleSort('Assigne')} className="filterIcon">
                            <Filter />
                        </span></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleTasks.map(task => (
                        <tr key={task.TaskId}>
                            <td>{task.Taskname}</td>
                            <td>{task.Description}</td>
                            <td>{task.Assigne}</td>
                            {(userName.Admin === 1 || userName.Username === task.Assigne) ? <td style={{ width: '156px' }}>
                                <button onClick={() => handleDelete(task.TaskId)}><Delete /></button>
                                <button onClick={() => handleArchive(task.TaskId)}>{(!archive)?<Archive />:<Unarchive/>}</button>
                            </td> : <td></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );

}

export default Tasks;