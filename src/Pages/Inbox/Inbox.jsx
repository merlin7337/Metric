import React from "react";
import cl from "./Inbox.module.scss";
import TaskList from "../../Components/TaskList/TaskList";

export default function Inbox() {
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2>Inbox</h2>
        <TaskList filter={(e) => e.assignedProject === undefined} />
      </div>
    </div>
  );
}
