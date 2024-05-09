import React, { useState } from 'react'

const TaskForm = ({addTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [tasks, setTasks] = useState([]);

    
  return (
    <div>TaskForm</div>
  )
}

export default TaskForm;