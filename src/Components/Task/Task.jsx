import React from 'react'
import cl from './Task.module.scss'
import more from '../../Images/UI Icons/more.svg'
import { ReactSVG } from 'react-svg'
import Checkbox from "../UI/Checkbox/Checkbox";

export default function Task(props) {

  //due date logic

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
            <ReactSVG src={more} className={cl.svgMore}/>
          </button>
        </div>
      </div>
    </div>
  )
}
