import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
        fetchTasks();
      }, []);
    
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:5001/tasks');
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, priority };
    try {
      await axios.post('http://localhost:5001/tasks', newTask);
      fetchTasks();
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
      <TaskList tasks={tasks}/>
    </div>
  );
};

export default TaskForm;






