import React, { useState } from "react";
import Checkbox from "../UI/Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import cl from "./Task.module.scss";
import moment from "moment";
import uuid from "react-uuid";
import { BiDuplicate } from "react-icons/bi";

export default function Task({
  setEditingTask,
  deleteTask,
  setType,
  setIsFormActive,
  task,
  isSearched,
  tasks,
  handleSetTasks,
}) {
  const { title, description, priority, dueDate, assignedProject } = task;
  const [dropdownVisiblility, setDropdownVisibility] = useState(false);

  const handleEdit = () => {
    setEditingTask(task);
    setType("edit");
    setIsFormActive(true);
    setDropdownVisibility(false);
  };

  const handleDuplicate = (task) => {
    handleSetTasks([
      ...tasks,
      {
        ...task,
        id: uuid(),
      },
    ]);
    setDropdownVisibility(false);
  };

  const dueDateClasses = [cl.dueDate];
  if (dueDate === undefined) {
    dueDateClasses.push(cl.undefined);
  } else if (dueDate < moment().format("DD.MM.YYYY")) {
    dueDateClasses.push(cl.overdue);
  } else if (dueDate === moment().format("DD.MM.YYYY")) {
    dueDateClasses.push(cl.today);
  } else if (dueDate > moment().format("DD.MM.YYYY")) {
    dueDateClasses.push(cl.future);
  }
  return isSearched ? (
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <div className={cl.taskLeft}>
          <div className={cl.taskTopLine}>
            <Checkbox
              className={cl.checkbox}
              priority={priority}
              disabled={isSearched}
            />
            <div className={cl.taskTitle}>{title}</div>
            <div className={dueDateClasses.join(" ")}>
              {!dueDate ? "" : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
            </div>
          </div>
          <div className={cl.taskDescription}>{description}</div>
        </div>
      </div>
      <div className={cl.divider} />
    </div>
  ) : (
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <div className={cl.taskLeft}>
          <div className={cl.taskTopLine}>
            <Checkbox
              className={cl.checkbox}
              priority={priority}
              deleteTask={deleteTask}
              task={task}
            />
            <div className={cl.taskTitle}>{title}</div>
            <div className={dueDateClasses.join(" ")}>
              {!dueDate ? "" : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
            </div>
          </div>
          <div className={cl.taskDescription}>{description}</div>
        </div>
        <div className={cl.taskTools}>
          <button className={cl.editButton} onClick={handleEdit}>
            <AiOutlineEdit className={cl.editIcon} />
          </button>
          <div className={cl.moreContainer}>
            <button
              className={cl.moreButton}
              onClick={() => setDropdownVisibility(!dropdownVisiblility)}
            >
              <FiMoreHorizontal className={cl.moreIcon} />
            </button>
            <Dropdown
              visibility={dropdownVisiblility}
              setVisibility={setDropdownVisibility}
            >
              <button className={cl.editFullButton} onClick={handleEdit}>
                <AiOutlineEdit className={cl.editIcon} />
                Edit task
              </button>
              <button
                className={cl.duplicateButton}
                onClick={() => handleDuplicate(task)}
              >
                <BiDuplicate className={cl.duplicateIcon} />
                Duplicate
              </button>
              <button
                className={cl.trashButton}
                onClick={() => {
                  deleteTask(task);
                }}
              >
                <FaRegTrashAlt className={cl.trashIcon} />
                Delete task
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={cl.divider} />
    </div>
  );
}
