import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./TaskList.css"


function TaskList({ tasks }) {
//   const [id] = useParams()  
  const [sortBy, setSortBy] = useState([]);
  const [filterBy, setFilterBy] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (criteria) => {
    setSortBy(criteria);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (criteria) => {
    setFilterBy(criteria);
  };


  let filteredTasks = [...tasks];

  if (filterBy === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterBy === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (sortBy === 'dueDate') {
    filteredTasks.sort((a, b) => (sortOrder === 'asc' ? a.dueDate.localeCompare(b.dueDate) : b.dueDate.localeCompare(a.dueDate)));
  } else if (sortBy === 'priority') {
    filteredTasks.sort((a, b) => (sortOrder === 'asc' ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority)));
  }

  return (
    <div>
      <h2 className='h2'>Task List</h2>
      <div className="mb-3">
        <button onClick={() => handleSort('dueDate')} className="me-2">Sort by Due Date {sortOrder === 'asc' ? '▲' : '▼'}</button>
        <button onClick={() => handleSort('priority')} className="me-2">Sort by Priority {sortOrder === 'asc' ? '▲' : '▼'}</button>
        <button onClick={() => handleFilter('completed')} className="me-2">Show Completed</button>
        <button onClick={() => handleFilter('pending')} className="me-2">Show Pending</button>
      </div>
      <table>
        <thead>
          <tr className ='tr'>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr 
            className='table2'
            key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>
                <Link to={`/tasks/${task.id}`} className="me-2">View</Link>
                <Link to={`/taskeditor/${task.id}`} className="me-2">Edit</Link>   
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
