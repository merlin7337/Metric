import React, { useRef } from 'react'
import cl from './Task.module.scss'

import Checkbox from "../UI/Checkbox/Checkbox";
import { FaTrashAlt } from "react-icons/fa"
import { FiMoreHorizontal } from "react-icons/fi"

// const buttons = ["First button", "Second button", "Third button", "Fourth button"]

export default function Task(props) {
  const buttonRef = useRef(null)

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
          <Checkbox/>
          {/*task text*/}
          <div className={cl.taskText}>
            <div className={cl.taskTitle}>{props.title}</div>
            <div className={cl.taskDescription}>{props.description}</div>
          </div>
        </div>
        {/*hidden tools, displayed in the right side of the task*/}
        <div className={cl.taskTools}>
          <button className={cl.moreButton} ref={buttonRef}>
            <FiMoreHorizontal className={cl.moreIcon}/>
          </button>
          <button className={cl.trashButton} onClick={() => props.deleteTask(props.task)}>
            <FaTrashAlt className={cl.trashIcon}/>
          </button>
        </div>
      </div>
    </div>
  )
}

//<div className={cl.popupContainer}>

//   <Popup containerRef={buttonRef}>
//   {buttons.map((text, key) => (
//     <button key={key} className={cl.popupButton}>{text}</button>
//   ))}
//   </Popup>

//</div>

