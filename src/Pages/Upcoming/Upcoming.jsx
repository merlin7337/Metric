import React from "react";
import cl from "./Upcoming.module.scss";
import TaskList from "../../components/TaskList/TaskList";
import moment from "moment";

export default function Upcoming() {
  const upcomingWeek = Array.from({ length: 7 }).map((_, i) =>
    moment().add(i, "days").format("DD.MM.YYYY")
  );

  const upcomingWeekTaskLists = Array.from({ length: 7 }).map((_, i) => {
    return i === 0 || i > 6 ? (
      <div className={cl.taskListContainer}>
        <div className={cl.dateHeading}>
          {moment(upcomingWeek[i], "DD.MM.YYYY").format("DD MMM")}
        </div>
        <TaskList
          filter={(e) => e.dueDate === upcomingWeek[i]}
          defaultValue={{ dueDate: upcomingWeek[i] }}
        />
      </div>
    ) : (
      <>
        <div className={cl.verticalDivider} />
        <div className={cl.taskListContainer}>
          <div className={cl.dateHeading}>
            {moment(upcomingWeek[i], "DD.MM.YYYY").format("DD MMM")}
          </div>
          <TaskList
            filter={(e) => e.dueDate === upcomingWeek[i]}
            defaultValue={{ dueDate: upcomingWeek[i] }}
          />
        </div>
      </>
    );
  });

  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2 className={cl.heading}>Upcoming</h2>
        <div className={cl.upcomingContainer}>{upcomingWeekTaskLists}</div>
      </div>
    </div>
  );
}
