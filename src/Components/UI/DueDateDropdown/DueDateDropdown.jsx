import moment from "moment";
import React, { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import cl from "./DueDateDropdown.module.scss";
import { IoMdCheckmark } from "react-icons/io";
import { BsSun, BsCalendar4Range } from "react-icons/bs";
import { VscCircleSlash } from "react-icons/vsc";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaCouch } from "react-icons/fa";
import useNextDayOfWeek from "../../../hooks/useNextDayOfWeek";
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DueDateDropdown({
  dueDate,
  setDueDate,
  dueDateVisibility,
  setDueDateVisibility,
}) {
  const [dueDateInputValue, setDueDateInputValue] = useState(
    moment(dueDate, "DD.MM.YYYY").format("YYYY-MM-DD")
  );

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
    const copy = e.target.value;
    setDueDateInputValue(copy);
    setDueDate(moment(copy, "YYYY-MM-DD").format("DD.MM.YYYY"));
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
          <input
            type="date"
            value={dueDateInputValue}
            onInput={handleChangeDueDate}
            className={cl.input}
          />
        </div>

        <DatePicker />

        <div className={cl.divider} />
        <button
          className={cl.dueDateButton}
          onClick={() => {
            setDueDate(moment().format("DD.MM.YYYY"));
            setDueDateInputValue(moment().format("YYYY-MM-DD"));
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
            setDueDateInputValue(moment().add(1, "days").format("YYYY-MM-DD"));
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
            setDueDateInputValue(
              moment(nextSat, "DD.MM.YYYY").format("YYYY-MM-DD")
            );
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
            setDueDateInputValue(
              moment(nextMon, "DD.MM.YYYY").format("YYYY-MM-DD")
            );
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
            setDueDateInputValue("");
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
