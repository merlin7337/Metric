import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../../context";
import cl from "./Sidebar.module.scss";
import { HiOutlineInbox } from "react-icons/hi2";
import { IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import moment from "moment";

export default function Sidebar() {
  const { isSidebarShown } = useContext(SidebarContext);

  const today = moment().toDate().getDate();

  if (isSidebarShown) {
    return (
      <div className={cl.sidebar}>
        <div className={cl.links}>
          <NavLink to="/inbox" className={[cl.link, cl["inbox"]].join(" ")}>
            <HiOutlineInbox className={cl.inboxIcon} />
            Inbox
          </NavLink>
          <NavLink to="/today" className={[cl.link, cl["today"]].join(" ")}>
            <div className={cl.calendarIconContainer}>
              <IoCalendarClearOutline className={cl.todayIcon} />
              <span className={cl.date}>{today}</span>
            </div>
            Today
          </NavLink>
          <NavLink
            to="/upcoming"
            className={[cl.link, cl["upcoming"]].join(" ")}
          >
            <IoCalendarOutline className={cl.upcomingIcon} />
            Upcoming
          </NavLink>
        </div>
      </div>
    );
  }
}
