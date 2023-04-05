import moment from "moment";
import React from "react";
import Dropdown from "../../Dropdown/Dropdown";
import cl from "./DueDateDropdown.module.scss";
import { IoMdCheckmark } from "react-icons/io";
import { BsSun, BsCalendar4Range } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaCouch } from "react-icons/fa";

export default function DueDateDropdown({
  dueDate,
  setDueDate,
  dueDateVisibility,
  setDueDateVisibility,
}) {
  let today = moment().toDate().getDate().toString();
  if (today.length === 1) {
    today = "0" + today;
  }

  let nextMon = new Date();
  nextMon.setDate(nextMon.getDate() + ((1 + 7 - nextMon.getDay()) % 7 || 7));

  let nextSat = new Date();
  nextSat.setDate(nextSat.getDate() + ((1 + 5 - nextSat.getDay()) % 7 || 7));

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
      dueDateModalIcon = <VscCircleSlash className={cl.invalidDateIcon} />;
      break;
  }

  const handleChangeDueDate = (e) => {
    e.currentTarget.value === ""
      ? setDueDate(undefined)
      : setDueDate(e.currentTarget.value);
  };

  return (
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
  );
}
