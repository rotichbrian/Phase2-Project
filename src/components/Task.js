import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Task = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5001/tasks/${id}`)
            .then(res => res.json())
            .then(data => setTask(data))
            .catch(error => console.error('Error fetching task:', error));
    }, [id]);

    const deleteTask = (taskId) => {
        fetch(`http://localhost:5001/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            console.log(`Task with ID ${taskId} has been deleted.`);
            
        })
        .catch(error => console.error('Error deleting task:', error));
      
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => deleteTask(id)}><Link to="/">Delete</Link></button>
        </div>
    );
};

export default Task;














