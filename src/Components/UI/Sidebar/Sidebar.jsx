import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../../context";
import cl from "./Sidebar.module.scss";
import { HiOutlineInbox } from "react-icons/hi2";
import { IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import useTasks from "../../../hooks/useTasks";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {
  const { sidebarVisibility } = useContext(SidebarContext);

  const [tasks] = useTasks();
  const [countOfInboxTasks, setCountOfInboxTasks] = useState(0);
  const [countOfTodayTasks, setCountOfTodayTasks] = useState(0);
  const [countOfUpcomingTasks, setCountOfUpcomingTasks] = useState(0);

  let today = moment().toDate().getDate().toString();
  today = today.length > 1 ? today : "0" + today;

  useEffect(() => {
    const upcomingWeekTasksCount = Array.from({ length: 7 })
      .map(
        (_, i) =>
          tasks.filter(
            (e) => e.dueDate === moment().add(i, "days").format("DD.MM.YYYY")
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
  }, [tasks]);

  if (sidebarVisibility) {
    return (
      <div className={cl.sidebar}>
        <div className={cl.links}>
          <NavLink to="/inbox" className={cl.link}>
            <div className={cl.navLinkLeft}>
              <HiOutlineInbox className={cl.inboxIcon} />
              Inbox
            </div>
            <div className={cl.countOfTasks}>{countOfInboxTasks}</div>
          </NavLink>
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
        </div>
      </div>
    );
  }
}
