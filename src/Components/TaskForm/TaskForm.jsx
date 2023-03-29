import React, { useState } from "react";
import cl from "./TaskForm.module.scss";
import Modal from "../Modal/Modal";
import { IoIosFlag, IoMdCheckmark } from "react-icons/io";
import uuid from "react-uuid";
import { IoCalendarOutline } from "react-icons/io5";

export default function TaskForm({
  setIsActive,
  editingTask,
  setEditingTask,
  tasks,
  setTasks,
  type,
}) {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );
  const [priority, setPriority] = useState(editingTask?.priority || 4);
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || undefined);
  const [assignedProject, setAssignedProject] = useState(
    editingTask?.assignedProject || undefined
  );

  const [priorityVisibility, setPriorityVisibility] = useState(false);
  const [dueDateVisibility, setDueDateVisibility] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const handleClose = () => {
    setIsActive(false);
    setTitle("");
    setDescription("");
    setPriority(4);
    setDueDate(undefined);
    setAssignedProject(undefined);
    setEditingTask({});
  };

  const createTask = () => {
    if (title !== "") {
      setTasks((state) => [
        ...state,
        {
          title,
          description,
          dueDate,
          priority,
          assignedProject,
          id: uuid(),
        },
      ]);
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...tasks,
          {
            title,
            description,
            dueDate,
            priority,
            assignedProject,
          },
        ])
      );
      handleClose();
    }
  };

  const editTask = () => {
    if (title !== "") {
      setTasks((state) => {
        const copy = JSON.parse(JSON.stringify(state)); //unique copy
        return copy.map((e) =>
          e.id === editingTask.id
            ? { ...e, title, description, priority, dueDate, assignedProject }
            : e
        );
      });
      handleClose();
    }
  };

  console.log(title);

  const onSave =
    type === "create" ? createTask : type === "edit" ? editTask : null;
  const submitButtonText =
    type === "create" ? "Add task" : type === "edit" ? "Save" : null;

  const priorityButtons = Array.from({ length: 4 }).map((_, i) => {
    const buttonPriority = i + 1;
    return (
      <button
        key={i}
        className={cl.priorityButton}
        onClick={() => {
          setPriority(buttonPriority);
          setPriorityVisibility(false);
        }}
      >
        <IoIosFlag
          className={[cl.flagIcon, cl[`p${buttonPriority}`]].join(" ")}
        />
        Priority {buttonPriority}
        {buttonPriority === priority && (
          <IoMdCheckmark className={cl.checkmarkIcon} />
        )}
      </button>
    );
  });

  return (
    <div className={cl.form}>
      <form>
        <input
          type="text"
          placeholder="Task name"
          value={title}
          onChange={handleChangeTitle}
          className={cl.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChangeDescription}
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
              className={[cl.flagIcon, cl[`p${priority}`]].join(" ")}
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
        <button className={cl.cancel} onClick={handleClose}>
          Cancel
        </button>
        <button className={cl.addTask} onClick={onSave}>
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
