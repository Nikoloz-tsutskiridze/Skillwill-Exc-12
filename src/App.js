import React, { useState } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask("");
    }
  };

  const completeTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks([...completedTasks, task]);
  };

  const deleteTask = (id, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const moveToTasks = (id) => {
    const task = completedTasks.find((task) => task.id === id);
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    setTasks([...tasks, task]);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-container">
        <div className="task-column">
          <h2>To Be Performed</h2>
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <span>{task.text}</span>
              <button onClick={() => completeTask(task.id)}>Finish</button>
              <button onClick={() => deleteTask(task.id, false)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="task-column">
          <h2>Completed</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className="task-item">
              <span>{task.text}</span>
              <button onClick={() => moveToTasks(task.id)}>
                Move to To-Do
              </button>
              <button onClick={() => deleteTask(task.id, true)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
