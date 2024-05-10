import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskEditor = ({tasks}) => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');

    const [edit, setEdit] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${id}`)
            .then(res => res.json())
            .then(data => setEdit(data))
            .catch(error => console.error('Error fetching task:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, dueDate, priority };
        try {
          await axios.put(`http://localhost:5000/tasks/${id}`, newTask);
        //   fetchTasks();
          setTitle('');
          setDescription('');
          setDueDate('');
          setPriority('');
        } catch (error) {
          console.error('Error adding task:', error);
        }
      };

      return (
        <div>
            <form onSubmit={handleSubmit}>
          <div className='title2'style={{ marginBottom: '10px' }}>
            <input
            className='title'
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='title2'style={{ marginBottom: '10px' }}>
            <textarea
              className='desc'
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='title2'>
            <select
            className='prio'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
    
          <div className='title2'style={{ marginBottom: '10px' }}>
            <label htmlFor="dueDate"></label>
            <input
            className='title'
            // placeholder='Due date'
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className='title2'>
          <button className='button'type="submit">Add Task</button>
          </div>
          
    
        </form>
        <div>
                <h3>{edit.title}</h3>
                <p>{edit.description}</p>
                <p>Due Date: {edit.dueDate}</p>
                <p>Priority: {edit.priority}</p>
               
            </div>
          
        </div>
      )
    }
    
    export default TaskEditor;