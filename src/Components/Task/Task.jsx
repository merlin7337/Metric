import React from 'react'
import cl from './Task.module.scss'
import Checkbox from "../UI/Checkbox/Checkbox";
import { FaTrashAlt } from "react-icons/fa"
import { TfiMoreAlt } from "react-icons/tfi"

export default function Task(props) {

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
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <div className={cl.taskLeft}>
          {/*Custom checkbox*/}
          <Checkbox priority={props.priority}/>
          {/*task text*/}
          <div className={cl.taskText}>
            <div className={cl.taskTitle}>{props.title}</div>
            <div className={cl.taskDescription}>{props.description}</div>
          </div>
        </div>
        {/*hidden tools, displayed in the right side of the task*/}
        <div className={cl.taskTools}>
          <button className={cl.moreButton}>
            <TfiMoreAlt className={cl.moreIcon}/>
          </button>
          <button className={cl.trashButton}>
            <FaTrashAlt className={cl.trashIcon} onClick={() => {props.deleteTask(props.task)}}/>
          </button>
        </div>
      </div>
    </div>
  )
}
