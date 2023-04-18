import moment from "moment";
import React from "react";
import Dropdown from "../../Dropdown/Dropdown";
import cl from "./DueDateDropdown.module.scss";
import { IoMdCheckmark } from "react-icons/io";
import { BsSun, BsCalendar4Range } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaCouch } from "react-icons/fa";
import useNextDayOfWeek from "../../../hooks/useNextDayOfWeek";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function DueDateDropdown({
  dueDate,
  setDueDate,
  dueDateVisibility,
  setDueDateVisibility,
}) {
  let today = moment().toDate().getDate().toString();
  today = today.length > 1 ? today : "0" + today;

  let nextMon = useNextDayOfWeek(1);
  let nextSat = useNextDayOfWeek(6);

  let dueDateModalIcon;
  if (dueDate === "") {
    dueDateModalIcon = <VscCircleSlash className={cl.noDueDateIcon} />;
  } else if (dueDate === moment().format("DD.MM.YYYY")) {
    dueDateModalIcon = (
      <div className={cl.calendarIconContainer}>
        <IoCalendarClearOutline className={cl.todayIcon} />
        <span className={cl.date}>{today}</span>
      </div>
    );
  } else if (dueDate === moment().add(1, "days").format("DD.MM.YYYY")) {
    dueDateModalIcon = <BsSun className={cl.tomorrowIcon} />;
  } else if (dueDate === nextSat) {
    dueDateModalIcon = <FaCouch className={cl.thisWeekendIcon} />;
  } else if (dueDate > moment().format("DD.MM.YYYY")) {
    dueDateModalIcon = <BsCalendar4Range className={cl.nextWeekIcon} />;
  } else {
    dueDateModalIcon = <VscCircleSlash className={cl.invalidDateIcon} />;
  }

  const handleChangeDueDate = (e) => {
    setDueDate(e.target.value);
  };

  return (
    <div className={cl.dueDateContainer}>
      <button
        className={cl.dueDateModalButton}
        onClick={() => setDueDateVisibility(!dueDateVisibility)}
      >
        {dueDateModalIcon}
        {dueDate === ""
          ? "Due date"
          : moment(dueDate, "DD.MM.YYYY").format("DD MMM")}
      </button>
      <Dropdown
        className={cl.dropdown}
        visibility={dueDateVisibility}
        setVisibility={setDueDateVisibility}
      >
        <div className={cl.inputContainer}>
          <div className={cl.info}>
            <IoMdInformationCircleOutline className={cl.infoIcon} />
            <div className={cl.extraInfo}>
              Write here date in format: DD.MM.YYYY
            </div>
          </div>
          <input
            type="text"
            placeholder="Due date"
            value={dueDate}
            onChange={handleChangeDueDate}
            className={cl.input}
          />
        </div>

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
            setDueDate(nextSat);
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
            setDueDate(nextMon);
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
            setDueDate("");
            setDueDateVisibility(false);
          }}
        >
          <VscCircleSlash className={cl.noDueDateIcon} />
          No due date
          {dueDate === "" && <IoMdCheckmark className={cl.checkmarkIcon} />}
        </button>
      </Dropdown>
    </div>
  );
}
