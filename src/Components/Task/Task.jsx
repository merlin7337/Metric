import React, { useState } from 'react'
import cl from './Task.module.scss'
import Checkbox from "../UI/Checkbox/Checkbox";
import Modal from "../Modal/Modal"
import { FaTrashAlt } from "react-icons/fa"
import { TfiMoreAlt } from "react-icons/tfi"

export default function Task(props) {
  const [modalVisible, setModalVisible] = useState(false)

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
          <button className={cl.moreButton} onClick={() => setModalVisible(!modalVisible)}>
            <TfiMoreAlt className={cl.moreIcon}/>
          </button>
          <Modal visible={modalVisible} setVisible={setModalVisible}>
            <button className={cl.trashButton} onClick={() => {props.deleteTask(props.task)}}>
              <FaTrashAlt className={cl.trashIcon}/>
              Delete task
            </button>
          </Modal>
        </div>
      </div>
    </div>
  )
}
