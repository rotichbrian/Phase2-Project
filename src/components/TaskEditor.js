import React from 'react'

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
    <div>TaskEditor</div>
  )
}

export default TaskEditor