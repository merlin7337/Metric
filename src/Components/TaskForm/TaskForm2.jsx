import React from "react";
import { useState } from "react";

export default function TaskForm2({ editingTask, setTasks, type }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };
  const createTask = () => {
    if (title !== "") {
      setTasks((state) => [
        ...state,
        {
          title,
          description,
          dueDate: undefined,
          priority: 4,
          assignedProject: undefined,
        },
      ]);
    }
  };

  const editTask = () => {
    setTasks((state) => {
      const copy = JSON.parse(JSON.stringify(state)); //unique copy
      return copy.map((e) =>
        e.id === editingTask.id ? { ...e, title, description } : e
      );
    });
  };

  const onSave =
    type === "create" ? createTask : type === "edit" ? editTask : null;

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Task name"
          value={title}
          onChange={handleChangeTitle}
          //   className={cl.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChangeDescription}
          //   className={cl.input}
        />
        <button type={"button"}>Cancel</button>
        <button onClick={onSave} type={"button"}>
          Save
        </button>
      </form>
    </div>
  );
}
