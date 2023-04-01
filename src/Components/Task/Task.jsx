import React, { useState } from "react";
import Checkbox from "../UI/Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { FaTrashAlt } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";
import cl from "./Task.module.scss";
import moment from "moment";

export default function Task({
  title,
  description,
  priority,
  dueDate,
  assignedProject,
  setEditingTask,
  deleteTask,
  task,
  setType,
  setIsFormActive,
}) {
  const [dropdownVisiblility, setDropdownVisibility] = useState(false);

  const handleEdit = () => {
    setEditingTask(task);
    setType("edit");
    setIsFormActive(true);
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

  return (
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <div className={cl.taskLeft}>
          <div className={cl.taskTopLine}>
            <Checkbox className={cl.checkbox} priority={priority} />
            <div className={cl.taskTitle}>{title}</div>
            <div className={dueDateClasses.join(" ")}>
              {dueDate === undefined
                ? ""
                : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
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
              <TfiMoreAlt className={cl.moreIcon} />
            </button>
            <Dropdown
              visibility={dropdownVisiblility}
              setVisibility={setDropdownVisibility}
            >
              <button
                className={cl.trashButton}
                onClick={() => {
                  deleteTask(task);
                }}
              >
                <FaTrashAlt className={cl.trashIcon} />
                Delete task
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
