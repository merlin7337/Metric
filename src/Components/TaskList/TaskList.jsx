import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import cl from "./TaskList.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

export default function TaskList({ filter }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: undefined,
    priority: 4,
    assignedProject: undefined,
  });
  const [tasks, setTasks] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isFormAdding, setIsFormAdding] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const items = JSON.parse(localStorage.getItem("tasks"));
      if (items) {
        setTasks(items);
      }
    }
  }, []);

  const buttonClasses = [cl.addTask];
  if (!isButtonActive) {
    buttonClasses.push(cl.disactive);
  }

  function cancel() {
    setIsFormActive(false);
    setIsButtonActive(true);
  }

  function createTask(newTask) {
    setTasks([...tasks, newTask]);
    setIsFormActive(false);
    setIsButtonActive(true);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  }

  function deleteTask(task) {
    const newTasks = tasks.filter((e) => e.id !== task.id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function editTask(task) {
    setIsButtonActive(!isButtonActive);
    setIsFormActive(!isFormActive);
    setIsFormAdding(!isFormAdding)
    if(isFormActive) {
      setTask({
        title: "",
        description: "",
        dueDate: undefined,
        priority: 4,
        assignedProject: undefined,
      })
    }else{
      setTask(task);
    }
  }

  function saveTask() {
    setIsButtonActive(true);
    setIsFormActive(false);
  }

  return (
    <div className={cl.taskList}>
      {tasks.filter(filter).map((e) => {
        return (
          <Task
            title={e.title}
            description={e.description}
            dueDate={e.dueDate}
            priority={e.priority}
            assignedProject={e.assignedProject}
            task={e}
            deleteTask={deleteTask}
            editTask={editTask}
            setIsFormAdding={setIsFormAdding}
            key={e.id}
          />
        );
      })}
      <div className={cl.container}>
        <button
          className={buttonClasses.join(" ")}
          onClick={() => {
            setIsFormActive(true);
            setIsButtonActive(false);
          }}
        >
          <AiOutlinePlus className={cl.plusIcon} />
          Add task
        </button>
        <TaskForm
          create={createTask}
          cancel={cancel}
          isActive={isFormActive}
          setIsActive={setIsFormActive}
          task={task}
          setTask={setTask}
          isFormAdding={isFormAdding}
          setIsFormAdding={setIsFormAdding}
          saveTask={saveTask}
        />
      </div>
    </div>
  );
}
