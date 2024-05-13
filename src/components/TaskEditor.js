import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskEditor.css'; 
import { Link } from 'react-router-dom';

const TaskEditor = () => {
    const { id } = useParams();// Extracting the ID from the URL parameters
    // State variables that manage task properties
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [edit, setEdit] = useState({});

useEffect(() => {
    axios.get(`http://localhost:5001/tasks/${id}`)
        .then(response => {
          // Updating state variables with fetched task data
            setEdit(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDueDate(response.data.dueDate);
            setPriority(response.data.priority);
        })
        .catch(error => console.error('Error fetching task:', error));
}, [id]);

const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const updatedTask = {
        title: title !== '' ? title : edit.title,
        description: description !== '' ? description : edit.description,
        dueDate: dueDate !== '' ? dueDate : edit.dueDate,
        priority: priority !== '' ? priority : edit.priority
    };

    try {
      // Sending a PUT request, updating the task with the new data
        await axios.put(`http://localhost:5001/tasks/${id}`, updatedTask);
        setEdit(updatedTask);
        console.log('Task updated successfully');
    } catch (error) {
        console.error('Error updating task:', error);
        // Handle error
    }
};

return (
    <div className="task-editor-container">
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div>
            <button type="submit">Update Task</button>
            <Link to="/"><button>Back</button></Link>
            </div>
        </form>
        {/* Display task details */}
        <div className="task-info">
            <h3>{edit.title}</h3>
            <p>{edit.description}</p>
            <p>Due Date: {edit.dueDate}</p>
            <p>Priority: {edit.priority}</p>
        </div>
    </div>
);
};

export default TaskEditor;