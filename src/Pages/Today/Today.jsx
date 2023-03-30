import moment from "moment";
import React from "react";
import TaskList from "../../components/TaskList/TaskList";
import cl from "./Today.module.scss";

export default function Today() {
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2>Today</h2>
        <TaskList filter={(e) => e.dueDate === moment().format("DD.MM.YYYY")} />
      </div>
    </div>
  );
}
