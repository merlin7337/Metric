import React, { useState } from "react";
import Checkbox from "../UI/Checkbox/Checkbox";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import cl from "./Task.module.scss";
import moment from "moment";
import TaskForm from "../TaskForm/TaskForm";
import useTasks from "../../hooks/useTasks";
import MoreDropdown from "./components/MoreDropdown/MoreDropdown";

export default function Task({
  editingTask,
  setEditingTask,
  deleteTask,
  task,
  isSearched,
}) {
  const { title, description, priority, dueDate } = task;
  const [tasks, handleSetTasks] = useTasks();
  const [dropdownVisiblility, setDropdownVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [type, setType] = useState("create");

  const handleEdit = () => {
    setEditingTask(task);
    setType("edit");
    setFormVisibility(true);
    setDropdownVisibility(false);
  };

  const dueDateClasses = [cl.dueDate];
  if (dueDate === "") {
    dueDateClasses.push(cl.undefined);
  } else if (dueDate === moment().format("DD.MM.YYYY")) {
    dueDateClasses.push(cl.today);
  } else if (moment(dueDate, "DD.MM.YYYY").toDate() < moment().toDate()) {
    dueDateClasses.push(cl.overdue);
  } else if (moment(dueDate, "DD.MM.YYYY").toDate() > moment().toDate()) {
    dueDateClasses.push(cl.future);
  }

  let today = moment().toDate().getDate().toString();
  if (today.length === 1) {
    today = "0" + today;
  }

  return isSearched ? (
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
            <span className={cl.taskTitle}>{title}</span>
            <div className={dueDateClasses.join(" ")}>
              {!dueDate ? "" : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
            </div>
          </div>
          <span className={cl.taskDescription}>{description}</span>
        </div>
      </div>
      <div className={cl.divider} />
    </div>
  ) : (
    <>
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
              <span className={cl.taskTitle}>{title}</span>
              <div className={dueDateClasses.join(" ")}>
                {!dueDate ? "" : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
              </div>
            </div>
            <span className={cl.taskDescription}>{description}</span>
          </div>
          <div className={cl.taskTools}>
            <button className={cl.editButton} onClick={handleEdit}>
              <AiOutlineEdit className={cl.editIcon} />
            </button>
            <div className={cl.moreContainer}>
              <button
                className={cl.moreButton}
                onClick={() => {
                  setDropdownVisibility(!dropdownVisiblility);
                  setEditingTask(task);
                }}
              >
                <FiMoreHorizontal className={cl.moreIcon} />
              </button>
              <MoreDropdown
                task={task}
                dropdownVisiblility={dropdownVisiblility}
                setDropdownVisibility={setDropdownVisibility}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                handleEdit={handleEdit}
                deleteTask={deleteTask}
                setType={setType}
                priority={priority}
              />
            </div>
          </div>
        </div>
      </div>
      {formVisibility && (
        <TaskForm
          setIsActive={setFormVisibility}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          tasks={tasks}
          handleSetTasks={handleSetTasks}
          type={type}
          setType={setType}
        />
      )}
      <div className={cl.divider} />
    </>
  );
}
