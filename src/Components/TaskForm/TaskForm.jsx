import React, { useState } from "react";
import cl from "./TaskForm.module.scss";
import Modal from "../Modal/Modal";
import { IoIosFlag, IoMdCheckmark } from "react-icons/io";
import uuid from "react-uuid";
import { IoCalendarOutline } from "react-icons/io5";

export default function TaskForm({
  create,
  cancel,
  isActive,
  setIsActive,
  task,
  setTask,
  isFormAdding,
  setIsFormAdding,
  saveTask,
}) {
  const [priorityVisibility, setPriorityVisibility] = useState(false);
  const [dueDateVisibility, setDueDateVisibility] = useState(false);

  const rootClasses = [cl.form];
  if (isActive) {
    rootClasses.push(cl.active);
  } else if (priorityVisibility) {
    rootClasses.push(cl.contextMenuActive);
  }

  const cancelAdding = () => {
    cancel();
    setTask({
      title: "",
      description: "",
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    });
    setDueDateVisibility(false);
    setPriorityVisibility(false);
    setIsActive(false);
  };

  const cancelEditing = () => {
    cancel();
    setTask({
      title: "",
      description: "",
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    });
    setDueDateVisibility(false);
    setPriorityVisibility(false);
    setIsActive(false);
    setIsFormAdding(true);
  };

  const saveEditing = () => {
    saveTask();
    setTask({
      title: "",
      description: "",
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    });
    setDueDateVisibility(false);
    setPriorityVisibility(false);
    setIsActive(false);
    setIsFormAdding(true);
  };

  const addNewTask = () => {
    const newTask = { ...task, id: uuid() };
    create(newTask);
    setTask({
      title: "",
      description: "",
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    });
    setDueDateVisibility(false);
    setPriorityVisibility(false);
    setIsActive(false);
    setIsFormAdding(true);
  };

  const priorityButtons = Array.from({ length: 4 }).map((_, i) => {
    const priority = i + 1;
    return (
      <button
        key={uuid()}
        className={cl.priorityButton}
        onClick={() => {
          setTask({ ...task, priority });
          setPriorityVisibility(false);
        }}
      >
        <IoIosFlag className={[cl.flagIcon, cl[`p${priority}`]].join(" ")} />
        Priority {priority}
        {task.priority === priority && (
          <IoMdCheckmark className={cl.checkmarkIcon} />
        )}
      </button>
    );
  });

  return (
    <div className={rootClasses.join(" ")}>
      <form>
        <input
          type="text"
          placeholder="Task name"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className={cl.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className={cl.input}
        />
      </form>
      <div className={cl.buttonsContainer}>
        <div className={cl.dueDateContainer}>
          <button
            className={cl.dueDateModalButton}
            onClick={() => setDueDateVisibility(!dueDateVisibility)}
          >
            <IoCalendarOutline className={cl.calendarIcon} />
            Due date
          </button>
          <Modal
            className={cl.dropdown}
            visible={dueDateVisibility}
            setVisible={setDueDateVisibility}
          >
            {priorityButtons}
          </Modal>
        </div>
        <div className={cl.priorityContainer}>
          <button
            className={cl.priorityModalButton}
            onClick={() => setPriorityVisibility(!priorityVisibility)}
          >
            <IoIosFlag
              className={[cl.flagIcon, cl[`p${task.priority}`]].join(" ")}
            />
            Priority
          </button>
          <Modal
            className={cl.dropdown}
            visible={priorityVisibility}
            setVisible={setPriorityVisibility}
          >
            {priorityButtons}
          </Modal>
        </div>
      </div>
      <div className={cl.buttons}>
        <button onClick={() => isFormAdding ? cancelAdding() : cancelEditing(task)} className={cl.cancel}>
          Cancel
        </button>
        {isFormAdding 
        ? 
        <button onClick={addNewTask} className={cl.addTask}>
          Add task
        </button>
        : 
        <button onClick={saveEditing} className={cl.addTask}>
          Save
        </button>}
      </div>
    </div>
  );
}
