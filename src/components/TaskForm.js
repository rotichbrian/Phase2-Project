import React, { useEffect, useState } from 'react'

const TaskForm = ({addTask}) => {
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
          const response = await axios.get('http://localhost:5000/tasks');
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, dueDate, priority };
        try {
          await axios.post('http://localhost:5000/tasks', newTask);
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
    <div>TaskForm</div>
  )
}

export default TaskForm;