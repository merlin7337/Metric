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
        moment(e.dueDate, "DD.MM.YYYY").toDate() <
        moment()
          .set({ hour: 0, minute: 0, seconds: 0, milliseconds: 0 })
          .toDate()
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
          filter={(e) =>
            moment(e.dueDate, "DD.MM.YYYY").toDate() <
            moment()
              .set({ hour: 0, minute: 0, seconds: 0, milliseconds: 0 })
              .toDate()
          }
          isButtonActive={false}
        />
      </div>
    </div>
  );
}
