import React from "react";
import cl from "./Upcoming.module.scss";
import TaskList from "../../components/TaskList/TaskList";
import moment from "moment";

export default function Upcoming() {
  const upcomingWeek = Array.from({ length: 7 }).map((_, i) =>
    moment().add(i, "days").format("DD.MM.YYYY")
  );

  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2 className={cl.heading}>Upcoming</h2>
        <div className={cl.upcomingContainer}>
          <div className={cl.taskListContainer}>
            <div className={[cl.dateHeading, cl.today].join(" ")}>
              {moment(upcomingWeek[0], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[0]}
              defaultValue={{ dueDate: upcomingWeek[0] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[1], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[1]}
              defaultValue={{ dueDate: upcomingWeek[1] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[2], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[2]}
              defaultValue={{ dueDate: upcomingWeek[2] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[3], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[3]}
              defaultValue={{ dueDate: upcomingWeek[3] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[4], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[4]}
              defaultValue={{ dueDate: upcomingWeek[4] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[5], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[5]}
              defaultValue={{ dueDate: upcomingWeek[5] }}
            />
          </div>
          <div className={cl.verticalDivider} />
          <div className={cl.taskListContainer}>
            <div className={cl.dateHeading}>
              {moment(upcomingWeek[6], "DD.MM.YYYY").format("DD MMM")}
            </div>
            <TaskList
              filter={(e) => e.dueDate === upcomingWeek[6]}
              defaultValue={{ dueDate: upcomingWeek[6] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
