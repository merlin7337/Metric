import React, { useState } from "react";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import cl from "./TaskList.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import useTasks from "../../hooks/useTasks";

export default function TaskList({ filter, defaultValue }) {
  const [editingTask, setEditingTask] = useState({});
  const [tasks, handleSetTasks] = useTasks();
  const [isFormActive, setIsFormActive] = useState(false);
  const [type, setType] = useState("create");

  

  const handleOpenForm = () => {
    setIsFormActive(true);
  };

  const handlePrioritySort = (a, b) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    } else {
      return 0;
    }
  };

  function deleteTask(task) {
    const newTasks = tasks.filter((e) => e.id !== task.id);
    handleSetTasks(newTasks);
  }

  return (
    <div className={cl.taskList}>
      {tasks
        .filter(filter)
        .sort(handlePrioritySort)
        .map((e) => {
          return (
            <Task
              task={e}
              deleteTask={deleteTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              setType={setType}
              setIsFormActive={setIsFormActive}
              key={e.id}
              tasks={tasks}
              handleSetTasks={handleSetTasks}
            />
          );
        })}
      <div className={cl.formContainer}>
        {isFormActive ? (
          <TaskForm
            setIsActive={setIsFormActive}
            tasks={tasks}
            handleSetTasks={handleSetTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            type={type}
            setType={setType}
            defaultValue={defaultValue}
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
