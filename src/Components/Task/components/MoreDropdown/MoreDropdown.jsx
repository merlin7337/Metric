import React from "react";
import cl from "./MoreDropdown.module.scss";
import Dropdown from "../../../Dropdown/Dropdown";
import { AiOutlineEdit } from "react-icons/ai";
import useNextDayOfWeek from "../../../../hooks/useNextDayOfWeek";
import useTasks from "../../../../hooks/useTasks";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "moment";
import { FaCouch, FaRegTrashAlt } from "react-icons/fa";
import { BsCalendar4Range, BsSun } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";
import { BiDuplicate } from "react-icons/bi";
import uuid from "react-uuid";
import { IoIosFlag } from "react-icons/io";

export default function MoreDropdown({
  task,
  dropdownVisiblility,
  setDropdownVisibility,
  editingTask,
  setEditingTask,
  handleEdit,
  deleteTask,
  setType,
  priority,
}) {
  const [tasks, handleSetTasks] = useTasks();

  let nextMon = useNextDayOfWeek(1);

  let nextSat = useNextDayOfWeek(6);

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

  const handleEditDueDate = (dueDate) => {
    const f = (tasks) => {
      const copy = [...tasks]; //unique copy
      return copy.map((e) =>
        e.id === editingTask.id ? { ...e, dueDate: dueDate } : e
      );
    };
    handleSetTasks(f(tasks));
    setDropdownVisibility(false);
    setType("create");
  };

  const handleEditPriority = (priority) => {
    const f = (tasks) => {
      const copy = [...tasks]; //unique copy
      return copy.map((e) =>
        e.id === editingTask.id ? { ...e, priority: priority } : e
      );
    };
    handleSetTasks(f(tasks));
    setDropdownVisibility(false);
    setType("create");
  };

  return (
    <Dropdown
      visibility={dropdownVisiblility}
      setVisibility={setDropdownVisibility}
      mix={cl.dropdown}
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
            setEditingTask(task);
            handleEditDueDate(moment().format("DD.MM.YYYY"));
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
            setEditingTask(task);
            handleEditDueDate(moment().add(1, "days").format("DD.MM.YYYY"));
          }}
        >
          <BsSun className={cl.tomorrowIcon} />
        </button>
        <button
          className={cl.dueDateButton}
          onClick={() => {
            setEditingTask(task);
            handleEditDueDate(moment(nextSat).format("DD.MM.YYYY"));
          }}
        >
          <FaCouch className={cl.thisWeekendIcon} />
        </button>
        <button
          className={cl.dueDateButton}
          onClick={() => {
            setEditingTask(task);
            handleEditDueDate(moment(nextMon).format("DD.MM.YYYY"));
          }}
        >
          <BsCalendar4Range className={cl.nextWeekIcon} />
        </button>
        <button
          className={cl.dueDateButton}
          onClick={() => {
            setEditingTask(task);
            handleEditDueDate("");
          }}
        >
          <VscCircleSlash className={cl.noDueDateIcon} />
        </button>
      </div>
      <div className={cl.heading}>Priority</div>
      <div className={cl.priorityButtonsContainer}>{priorityButtons}</div>
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
  );
}
