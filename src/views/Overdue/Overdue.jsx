import React from "react";
import cl from "./Overdue.module.scss";
import TaskList from "../../components/TaskList/TaskList";
import moment from "moment";
import useTasks from "../../hooks/useTasks";

export default function Overdue() {
  const [tasks, handleSetTasks] = useTasks();

  function handleReschedule() {
    handleSetTasks(
      tasks.map((e) =>
        e.dueDate < moment().format("DD.MM.YYYY")
          ? { ...e, dueDate: moment().format("DD.MM.YYYY") }
          : e
      )
    );
  }
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <div className={cl.viewTop}>
          <h2>Overdue</h2>
          <button onClick={handleReschedule} className={cl.rescheduleButton}>
            Reschedule
          </button>
        </div>
        <TaskList
          filter={(e) => e.dueDate < moment().format("DD.MM.YYYY")}
          isButtonActive={false}
        />
      </div>
    </div>
  );
}
