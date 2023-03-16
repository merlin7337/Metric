import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import Task from '../Task/Task'
import TaskForm from '../TaskForm/TaskForm'
import cl from './TaskList.module.css'
import plus from '../../Images/UI Icons/plus.svg'

export default function TaskList({filter}) {
  
  const [tasks, setTasks] = useState([])
  const [isFormActive, setIsFormActive] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(true)

  const buttonClasses = [cl.addTask]
  if (!isButtonActive) {
    buttonClasses.push(cl.disactive)
  }

  function cancel() {
    setIsFormActive(false)
    setIsButtonActive(true)
  }
  function createTask(newTask) {
    setTasks([...tasks, newTask])
    setIsFormActive(false)
    setIsButtonActive(true)
  }

    return(
      <div className={cl.taskList}>
        {tasks.filter(filter).map(e => {
          return <Task 
            title={e.title} 
            description={e.description} 
            dueDate={e.dueDate}
            priority={e.priority}
            assignedProject={e.assignedProject}
            key={e.title}
          />
        })}
        <div className={cl.container}>
          <button
            className={buttonClasses.join(' ')} 
            onClick={() => {setIsFormActive(true); setIsButtonActive(false)}}
            isActive={isButtonActive}
            setIsActive={setIsButtonActive}
          >
            <ReactSVG src={plus} className={cl.plus}/>
            Add task
          </button>
          <TaskForm create={createTask} cancel={cancel} isActive={isFormActive} setIsActive={setIsFormActive}/>
        </div>
      </div>
    )
}
