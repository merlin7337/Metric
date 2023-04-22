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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DueDateDropdown({
  dueDate,
  setDueDate,
  dueDateVisibility,
  setDueDateVisibility,
}) {
  const [dueDateInputValue, setDueDateInputValue] = useState(
    dueDate ? dayjs(moment(dueDate, "DD.MM.YYYY").toDate()) : null
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
  } else if (dueDate === moment(nextSat).format("DD.MM.YYYY")) {
    dueDateModalIcon = <FaCouch className={cl.thisWeekendIcon} />;
  } else if (dueDate > moment().format("DD.MM.YYYY")) {
    dueDateModalIcon = <BsCalendar4Range className={cl.nextWeekIcon} />;
  } else {
    dueDateModalIcon = <VscCircleSlash className={cl.invalidDateIcon} />;
  }

  const handleChangeDueDate = (value) => {
    setDueDateInputValue(dayjs(value));
    console.log(dayjs(value).format("DD.MM.YYYY"));
    setDueDate(dayjs(value).format("DD.MM.YYYY"));
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
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          value={dueDateInputValue}
          onChange={handleChangeDueDate}
          closeOnSelect={true}
          disablePast={true}
        />
        <div className={cl.divider} />
        <button
          className={cl.dueDateButton}
          onClick={() => {
            setDueDate(moment().format("DD.MM.YYYY"));
            setDueDateInputValue(dayjs());
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
            setDueDateInputValue(dayjs().add(1, "days"));
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
            setDueDateInputValue(dayjs(nextSat));
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
            setDueDateInputValue(dayjs(nextMon));
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
            setDueDateInputValue(null);
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
