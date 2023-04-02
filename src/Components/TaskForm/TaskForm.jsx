import React, { useState } from "react";
import cl from "./TaskForm.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import { IoIosFlag, IoMdCheckmark } from "react-icons/io";
import uuid from "react-uuid";
import { BsSun, BsCalendar4Range } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaCouch } from "react-icons/fa";
import moment from "moment";

export default function TaskForm({
  setIsActive,
  editingTask,
  setEditingTask,
  setTasks,
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
    editingTask?.dueDate || defaultValue?.dueDate || undefined
  );
  const [assignedProject, setAssignedProject] = useState(
    editingTask?.assignedProject || defaultValue?.assignedProject || undefined
  );

  const [priorityVisibility, setPriorityVisibility] = useState(false);
  const [dueDateVisibility, setDueDateVisibility] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const handleChangeDueDate = (e) => {
    setDueDate(e.currentTarget.value);
  };

  const handleClose = () => {
    setIsActive(false);
    setTitle("");
    setDescription("");
    setPriority(4);
    setDueDate(undefined);
    setAssignedProject(undefined);
    setEditingTask({});
    if (type === "edit") {
      setType("create");
    }
  };

  const createTask = () => {
    if (title !== "") {
      setTasks({
        title,
        description,
        dueDate,
        priority,
        assignedProject,
        id: uuid(),
      });
      handleClose();
    }
  };

  const editTask = () => {
    setTasks((state) => {
      const copy = JSON.parse(JSON.stringify(state)); //unique copy
      return copy.map((e) =>
        e.id === editingTask.id
          ? { ...e, title, description, priority, dueDate, assignedProject }
          : e
      );
    });
    handleClose();
    setType("create");
  };

  let today = moment().toDate().getDate().toString();
  if (today.length === 1) {
    today = "0" + today;
  }

  let nextMon = new Date();
  nextMon.setDate(nextMon.getDate() + ((1 + 7 - nextMon.getDay()) % 7 || 7));

  let nextSat = new Date();
  nextSat.setDate(nextSat.getDate() + ((1 + 5 - nextSat.getDay()) % 7 || 7));

  const onSave =
    type === "create" ? createTask : type === "edit" ? editTask : null;
  const submitButtonText =
    type === "create" ? "Add task" : type === "edit" ? "Save" : null;

  console.log(type);

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

  let dueDateModalIcon;
  switch (dueDate) {
    case moment().format("DD.MM.YYYY"):
      dueDateModalIcon = (
        <div className={cl.calendarIconContainer}>
          <IoCalendarClearOutline className={cl.todayIcon} />
          <span className={cl.date}>{today}</span>
        </div>
      );
      break;
    case moment().add(1, "days").format("DD.MM.YYYY"):
      dueDateModalIcon = <BsSun className={cl.tomorrowIcon} />;
      break;
    case moment(nextSat).format("DD.MM.YYYY"):
      dueDateModalIcon = <FaCouch className={cl.thisWeekendIcon} />;
      break;
    case moment(nextMon).format("DD.MM.YYYY"):
      dueDateModalIcon = <BsCalendar4Range className={cl.nextWeekIcon} />;
      break;
    case undefined:
      dueDateModalIcon = <VscCircleSlash className={cl.noDueDateIcon} />;
      break;
    default:
      dueDateModalIcon = <BsCalendar4Range className={cl.nextWeekIcon} />;
      break;
  }

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
            {dueDateModalIcon}
            {dueDate === undefined
              ? "Due date"
              : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
          </button>
          <Dropdown
            className={cl.dropdown}
            visibility={dueDateVisibility}
            setVisibility={setDueDateVisibility}
          >
            <input
              type="text"
              placeholder="Due date"
              value={dueDate}
              onChange={handleChangeDueDate}
              className={cl.input}
            />
            <div className={cl.divider} />
            <button
              className={cl.dueDateButton}
              onClick={() => {
                setDueDate(moment().format("DD.MM.YYYY"));
                setDueDateVisibility(false);
              }}
            >
              <div className={cl.calendarIconContainer}>
                <IoCalendarClearOutline className={cl.todayIcon} />
                <span className={cl.date}>{today}</span>
              </div>
              Today
              {dueDate === moment().format("DD.MM.YYYY") && (
                <IoMdCheckmark className={cl.checkmarkIcon} />
              )}
            </button>
            <button
              className={cl.dueDateButton}
              onClick={() => {
                setDueDate(moment().add(1, "days").format("DD.MM.YYYY"));
                setDueDateVisibility(false);
              }}
            >
              <BsSun className={cl.tomorrowIcon} />
              Tomorrow
              {dueDate === moment().add(1, "days").format("DD.MM.YYYY") && (
                <IoMdCheckmark className={cl.checkmarkIcon} />
              )}
            </button>
            <button
              className={cl.dueDateButton}
              onClick={() => {
                setDueDate(moment(nextSat).format("DD.MM.YYYY"));
                setDueDateVisibility(false);
              }}
            >
              <FaCouch className={cl.thisWeekendIcon} />
              This weekend
              {dueDate === moment(nextSat).format("DD.MM.YYYY") && (
                <IoMdCheckmark className={cl.checkmarkIcon} />
              )}
            </button>
            <button
              className={cl.dueDateButton}
              onClick={() => {
                setDueDate(moment(nextMon).format("DD.MM.YYYY"));
                setDueDateVisibility(false);
              }}
            >
              <BsCalendar4Range className={cl.nextWeekIcon} />
              Next week
              {dueDate === moment(nextMon).format("DD.MM.YYYY") && (
                <IoMdCheckmark className={cl.checkmarkIcon} />
              )}
            </button>
            <button
              className={cl.dueDateButton}
              onClick={() => {
                setDueDate(undefined);
                setDueDateVisibility(false);
              }}
            >
              <VscCircleSlash className={cl.noDueDateIcon} />
              No due date
              {dueDate === undefined && (
                <IoMdCheckmark className={cl.checkmarkIcon} />
              )}
            </button>
          </Dropdown>
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
          <Dropdown
            className={cl.dropdown}
            visibility={priorityVisibility}
            setVisibility={setPriorityVisibility}
          >
            {priorityButtons}
          </Dropdown>
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
