import React from 'react'
import cl from './Inbox.module.scss';
import TaskList from '../../TaskList/TaskList';

export default function Inbox() {
  // const daysOfWeek = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ]
  // console.log(daysOfWeek[moment().toDate().getDay()]);
  
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2>Inbox</h2>
        <TaskList filter={e => e.assignedProject === undefined}/>
      </div>
    </div>
  )
}