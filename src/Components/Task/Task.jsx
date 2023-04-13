import React, { useState } from "react";
import Checkbox from "../UI/Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { FaCouch, FaRegTrashAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import cl from "./Task.module.scss";
import moment from "moment";
import uuid from "react-uuid";
import { BiDuplicate } from "react-icons/bi";
import { IoIosFlag } from "react-icons/io";
import useTasks from "../../hooks/useTasks";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsCalendar4Range, BsSun } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";

export default function Task({
  editingTask,
  setEditingTask,
  deleteTask,
  setType,
  setIsFormActive,
  task,
  isSearched,
}) {
  const { title, description, priority, dueDate, assignedProject } = task;
  const [tasks, handleSetTasks] = useTasks();
  const [dropdownVisiblility, setDropdownVisibility] = useState(false);

  const handleEditPriority = (priority, editingTask) => {
    console.log(priority);
    const f = (tasks) => {
      const copy = [...tasks]; //unique copy
      return copy.map((e) =>
        e.id === editingTask.id ? { ...e, priority: priority } : e
      );
    };
    console.log(f(tasks, priority));
    handleSetTasks(f(tasks, priority));
    setDropdownVisibility(false);
    setType("create");
  };

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

  let today = moment().toDate().getDate().toString();
  if (today.length === 1) {
    today = "0" + today;
  }

  const priorityButtons = Array.from({ length: 4 }).map((_, i) => {
    const buttonPriority = i + 1;
    const priorityButtonClasses = [cl.priorityButton];

    if (buttonPriority === priority) {
      priorityButtonClasses.push(cl.active);
    }

    return (
      <button
        key={i}
        className={priorityButtonClasses.join(" ")}
        onClick={() => {
          handleEditPriority(buttonPriority, editingTask);
          setDropdownVisibility(false);
        }}
      >
        <IoIosFlag
          className={[cl.flagIcon, cl[`p${buttonPriority}`]].join(" ")}
        />
      </button>
    );
  });

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
              <div className={cl.divider} />
              <div className={cl.heading}>Due date</div>
              <div className={cl.dueDateButtonsContainer}>
                <button
                  className={cl.dueDateButton}
                  onClick={() => {
                    // setDueDate(moment().format("DD.MM.YYYY"));
                    // setDueDateVisibility(false);
                  }}
                >
                  <div className={cl.calendarIconContainer}>
                    <IoCalendarClearOutline className={cl.todayIcon} />
                    <span className={cl.date}>{today}</span>
                  </div>
                </button>
                <button
                  className={cl.dueDateButton}
                  onClick={() => {
                    // setDueDate(moment().add(1, "days").format("DD.MM.YYYY"));
                    // setDueDateVisibility(false);
                  }}
                >
                  <BsSun className={cl.tomorrowIcon} />
                </button>
                <button
                  className={cl.dueDateButton}
                  onClick={() => {
                    // setDueDate(moment(nextSat).format("DD.MM.YYYY"));
                    // setDueDateVisibility(false);
                  }}
                >
                  <FaCouch className={cl.thisWeekendIcon} />
                </button>
                <button
                  className={cl.dueDateButton}
                  onClick={() => {
                    // setDueDate(moment(nextMon).format("DD.MM.YYYY"));
                    // setDueDateVisibility(false);
                  }}
                >
                  <BsCalendar4Range className={cl.nextWeekIcon} />
                </button>
                <button
                  className={cl.dueDateButton}
                  onClick={() => {
                    // setDueDate(undefined);
                    // setDueDateVisibility(false);
                  }}
                >
                  <VscCircleSlash className={cl.noDueDateIcon} />
                </button>
              </div>
              <div className={cl.heading}>Priority</div>
              <div className={cl.priorityButtonsContainer}>
                {priorityButtons}
              </div>
              <div className={cl.divider} />
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
