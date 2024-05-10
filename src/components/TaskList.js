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


  return (
    <div>TaskList</div>
  )
}

export default TaskList