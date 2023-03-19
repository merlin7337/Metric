import React, { useRef, useState } from 'react'
import cl from './Task.module.scss'
import more from '../../Images/UI Icons/more.svg'
import { ReactSVG } from 'react-svg'
import Checkbox from "react-custom-checkbox";
import { IoIosCheckmark, IoIosCheckmarkCircle } from "react-icons/io"
// import Popup from '../Popup/Popup'

// const buttons = ["First button", "Second button", "Third button", "Fourth button"]

export default function Task(props) {
  const buttonRef = useRef(null)

  //priority logic

  const priorityColors = {
    1: '#d1453b',
    2: '#eb8909',
    3: '#246fe0',
    4: '#666',
  }

  const checkmarkIconClasses = [cl.checkmarkIcon, cl[`p${props.priority}`]].join(' ')

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
          <Checkbox
            className={cl.checkbox}
            icon={<IoIosCheckmarkCircle className={checkmarkIconClasses}/>}
            borderRadius={90}
            borderColor={priorityColors[props.priority]}
          />
          {/*task text*/}
          <div className={cl.taskText}>
            <div className={cl.taskTitle}>{props.title}</div>
            <div className={cl.taskDescription}>{props.description}</div>
          </div>
        </div>
        {/*hidden tools, displayed in the right side of the task*/}
        <div className={cl.taskTools}>
          <button className={cl.moreButton} ref={buttonRef}>
            <ReactSVG src={more} className={cl.svgMore}/>
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

