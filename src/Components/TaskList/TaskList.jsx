import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import cl from "./TaskList.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

export default function TaskList({ filter }) {
  const [editingTask, setEditingTask] = useState();
  const [tasks, setTasks] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [type, setType] = useState("create");

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const items = JSON.parse(localStorage.getItem("tasks"));
      if (items) {
        setTasks(items);
      }
    }
  }, []);

  const handleOpenForm = () => {
    setIsFormActive(true);
  };

  function deleteTask(task) {
    const newTasks = tasks.filter((e) => e.id !== task.id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <div className={cl.taskList}>
      {tasks.filter(filter).map((e) => {
        return (
          <Task
            {...e}
            task={e}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
            key={e.id}
            setType={setType}
            setIsFormActive={setIsFormActive}
          />
        );
      })}
      <div className={cl.container}>
        {isFormActive ? (
          <TaskForm
            setIsActive={setIsFormActive}
            editingTask={editingTask}
            setTasks={setTasks}
            type={type}
          />
        ) : (
          <button className={cl.addTask} onClick={handleOpenForm}>
            <AiOutlinePlus className={cl.plusIcon} />
            Add task
          </button>
        )}
      </div>
    </div>
  );
}
