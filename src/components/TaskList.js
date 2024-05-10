import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TaskList({tasks}) {
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
  }else if (filterBy === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (sortBy === 'dueDate') {
    filteredTasks.sort((a, b) => (sortOrder === 'asc' ? a.dueDate.localeCompare(b.dueDate) : b.dueDate.localeCompare(a.dueDate)));
  } else if (sortBy === 'priority') {
    filteredTasks.sort((a, b) => (sortOrder === 'asc' ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority)));
  }

  return (
    <div>TaskList</div>
  )
}

export default TaskList