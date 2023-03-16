import React, { useState } from 'react'
import cl from './TaskForm.module.css'

export default function TaskForm({create, cancel, isActive, setIsActive}) {
  const rootClasses = [cl.form]
    if(isActive){
      rootClasses.push(cl.active)
    }

  const [task, setTask] = useState({
    title:'',
    description:'', 
    dueDate:undefined, 
    priority:4, 
    assignedProject:undefined,
  }) 

  const cancelAdding = e => {
    e.preventDefault()
    cancel()
    setTask({
      title:'',
      description:'',
      dueDate:undefined,
      priority:4,
      assignedProject:undefined,
    })
    setIsActive(false)
  }

  const addNewTask = e => {
    e.preventDefault()
    const newTask = {...task}
    create(newTask)
    setTask({
      title:'',
      description:'',
      dueDate:undefined,
      priority:4,
      assignedProject:undefined,
    })
    setIsActive(false)
  }
  return (
    <form className={rootClasses.join(' ')}>
      <input
        type='text'
        placeholder='Task name'
        value={task.title}
        onChange={e => setTask({...task, title: e.target.value})}
        className={cl.input}
      />
      <input
        type='text'
        placeholder='Description'
        value={task.description}
        onChange={e => setTask({...task, description: e.target.value})}
        className={cl.input}
      />
      <div className={cl.buttons}>
        <button onClick={cancelAdding} className={cl.cancel}>Cancel</button>
        <button onClick={addNewTask} className={cl.addTask}>Add task</button>
      </div>
    </form>
  )
}