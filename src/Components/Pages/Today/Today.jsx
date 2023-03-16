import moment from 'moment'
import React from 'react'
import TaskList from '../../TaskList/TaskList'
import cl from './Today.module.css'

export default function Today() {
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        <h2>Today</h2>
        <TaskList filter={e => e.dueDate === moment()}/>
      </div>
    </div>
  )
}
