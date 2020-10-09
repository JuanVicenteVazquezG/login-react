import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';

function Firestore(props) {

    const [tasks, setTasks] = useState(null);
    const [task, setTask] = useState('');
    const [editionMode, setEditionMode] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        const obtainData = async () => {
            try {
                const data = await db.collection(props.user.uid).get();
                const arrayData = data.docs.map(doc => { return { id: doc.id, ...doc.data() }; });
                setTasks(arrayData);
            }
            catch (err) {
                console.log(err);
            }
        };
        obtainData();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!task.trim()) {
            console.log('Task is empty');
            return;
        }
        try {
            const newTask = { name: task, date: Date.now() };
            const data = await db.collection(props.user.uid).add(newTask);
            setTasks([...tasks, { ...newTask, id: data.id }]);
            setTask('');
        }
        catch (err) {
            console.log(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await db.collection(props.user.uid).doc(id).delete();
            const tasksFiltered = tasks.filter(taskToFilter => taskToFilter.id !== id);
            setTasks(tasksFiltered);
        }
        catch (err) {
            console.log(err);
        }
    };

    const editTask = (taskToEdit) => {
        setEditionMode(true);
        setId(taskToEdit.id);
        setTask(taskToEdit.name);
    };

    const saveTask = async (e) => {
        e.preventDefault();
        if (!task.trim()) {
            console.log('Task is empty');
            return;
        }
        try {
            await db.collection(props.user.uid).doc(id).update({ name: task });
            const arrayEdited = tasks.map(taskToEdit => taskToEdit.id === id ? { id: taskToEdit.id, name: task, date: taskToEdit.date } : taskToEdit);
            setTasks(arrayEdited);
            setEditionMode(false);
            setId('');
            setTask('');
        }
        catch (err) {
            console.log(err);
        }

    };

    return (
        <div className='container mt-3'>
            <div className="row">
                <div className="col-md-6">
                    <h3>{editionMode ? 'Task Edit' : 'FireBase Crud'}</h3>
                    <ul className="list-group">
                        {tasks ? tasks.map(task => (<li className="list-group-item" key={task.id}>{task.name}
                            <button
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => deleteTask(task.id)}>
                                erase
              </button>
                            <button className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => editTask(task)}>
                                edit
              </button>
                        </li>)) : null}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>Form</h3>
                    <form >
                        <input
                            type="text"
                            placeholder="Introduce a Task"
                            className="form-control mb-2"
                            onChange={(e) => setTask(e.target.value)}
                            value={task}
                        />
                        <button
                            type="submit"
                            onClick={(e) => { editionMode ? saveTask(e) : addTask(e); }}
                            className={editionMode ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'}>{editionMode ? 'Save task' : 'Add Task'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Firestore;
