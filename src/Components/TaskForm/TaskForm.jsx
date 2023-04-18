import React, { useState } from "react";
import cl from "./TaskForm.module.scss";
import uuid from "react-uuid";
import DueDateDropdown from "../UI/DueDateDropdown/DueDateDropdown";
import PriorityDropdown from "../UI/PriorityDropdown/PriorityDropdown";

export default function TaskForm({
  setIsActive,
  editingTask,
  setEditingTask,
  tasks,
  handleSetTasks,
  type,
  setType,
  defaultValue,
}) {
  const [title, setTitle] = useState(
    editingTask?.title || defaultValue?.title || ""
  );
  const [description, setDescription] = useState(
    editingTask?.description || defaultValue?.description || ""
  );
  const [priority, setPriority] = useState(
    editingTask?.priority || defaultValue?.priority || 4
  );
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate || defaultValue?.dueDate || ""
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
    setDueDate("");
    setEditingTask({});
    if (type === "edit") {
      setType("create");
    }
  };

  const createTask = () => {
    if (title !== "") {
      handleSetTasks([
        ...tasks,
        {
          title,
          description,
          dueDate,
          priority,
          id: uuid(),
        },
      ]);
      handleClose();
    }
  };

  const editTask = () => {
    const f = (tasks) => {
      const copy = [...tasks]; //unique copy
      return copy.map((e) =>
        e.id === editingTask.id
          ? { ...e, title, description, priority, dueDate }
          : e
      );
    };
    handleSetTasks(f(tasks));
    handleClose();
    setType("create");
  };

  const onSave =
    type === "create" ? createTask : type === "edit" ? editTask : null;
  const submitButtonText =
    type === "create" ? "Add task" : type === "edit" ? "Save" : null;

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
        <DueDateDropdown
          dueDate={dueDate}
          setDueDate={setDueDate}
          dueDateVisibility={dueDateVisibility}
          setDueDateVisibility={setDueDateVisibility}
        />
        <PriorityDropdown
          priority={priority}
          setPriority={setPriority}
          priorityVisibility={priorityVisibility}
          setPriorityVisibility={setPriorityVisibility}
        />
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
