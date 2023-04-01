import React from "react";
import cl from "./Upcoming.module.scss";
import TaskList from "../../components/TaskList/TaskList";
import moment from "moment";

export default function Upcoming() {
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2>Upcoming</h2>
        <TaskList filter={(e) => e.dueDate > moment().format("DD.MM.YYYY")} />
      </div>
    </div>
  );
}
