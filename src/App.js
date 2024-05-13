import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Task from './components/Task';
import TaskEditor from './components/TaskEditor';



function App() {
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
    
   return(
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<TaskForm/>}/>
      <Route path='/tasks/:id' element={<Task/>}/>
      <Route path='/taskeditor/:id' element={<TaskEditor/>}/>
    </Routes>

    
    {/* <TaskList tasks={tasks}/> */}
    <Footer/>
 
    </>
    
   )
}


export default App;
