import React from "react";
import { NavLink } from "react-router-dom";
import cl from "./Sidebar.module.scss";
import { HiOutlineInbox } from "react-icons/hi2";
import { IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import useTasks from "../../../hooks/useTasks";
import useSidebar from "../../../hooks/useSidebar";
import { useState } from "react";
import { useEffect } from "react";
import { BsCalendar4Range } from "react-icons/bs";

export default function Sidebar() {
  const [sidebarVisibility] = useSidebar();

  const [tasks] = useTasks();
  const [countOfInboxTasks, setCountOfInboxTasks] = useState(0);
  const [countOfTodayTasks, setCountOfTodayTasks] = useState(0);
  const [countOfUpcomingTasks, setCountOfUpcomingTasks] = useState(0);
  const [countOfOverdueTasks, setCountOfOverdueTasks] = useState(0);

  let today = moment().toDate().getDate().toString();
  today = today.length > 1 ? today : "0" + today;

  useEffect(() => {
    const upcomingWeekTasksCount = Array.from({ length: 6 })
      .map(
        (_, i) =>
          tasks.filter(
            (e) =>
              e.dueDate ===
              moment()
                .add(i + 1, "days")
                .format("DD.MM.YYYY")
          ).length
      )
      .reduce((a, b) => {
        return a + b;
      });

    setCountOfInboxTasks(tasks.length);
    setCountOfTodayTasks(
      tasks.filter((e) => e.dueDate === moment().format("DD.MM.YYYY")).length
    );
    setCountOfUpcomingTasks(upcomingWeekTasksCount);
    setCountOfOverdueTasks(
      tasks.filter(
        (e) =>
          moment(e.dueDate, "DD.MM.YYYY").toDate() <
          moment()
            .set({ hour: 0, minute: 0, seconds: 0, milliseconds: 0 })
            .toDate()
      ).length
    );
  }, [tasks]);

  return (
    <div className={`${cl.sidebar} ${sidebarVisibility ? cl.active : ""}`}>
      <div className={cl.links}>
        <NavLink to="/inbox" className={cl.link}>
          <div className={cl.navLinkLeft}>
            <HiOutlineInbox className={cl.inboxIcon} />
            Inbox
          </div>
          <div className={cl.countOfTasks}>{countOfInboxTasks}</div>
        </NavLink>
        <div className={cl.divider} />
        <NavLink to="/today" className={cl.link}>
          <div className={cl.navLinkLeft}>
            <div className={cl.calendarIconContainer}>
              <IoCalendarClearOutline className={cl.todayIcon} />
              <span className={cl.date}>{today}</span>
            </div>
            Today
          </div>
          <div className={cl.countOfTasks}>{countOfTodayTasks}</div>
        </NavLink>
        <NavLink to="/upcoming" className={cl.link}>
          <div className={cl.navLinkLeft}>
            <IoCalendarOutline className={cl.upcomingIcon} />
            Upcoming
          </div>
          <div className={cl.countOfTasks}>{countOfUpcomingTasks}</div>
        </NavLink>
        <NavLink to="/overdue" className={cl.link}>
          <div className={cl.navLinkLeft}>
            <BsCalendar4Range className={cl.overdueDateIcon} />
            Overdue
          </div>
          <div className={cl.countOfTasks}>{countOfOverdueTasks}</div>
        </NavLink>
      </div>
    </div>
  );
}
