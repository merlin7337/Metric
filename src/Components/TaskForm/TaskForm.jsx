import React, { useState } from 'react'
import cl from './TaskForm.module.scss'
import Modal from '../Modal/Modal'

export default function TaskForm({create, cancel, isActive, setIsActive}) {
  const [priorityVisibility, setPriorityVisibility] = useState(false)
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

  const cancelAdding = () => {
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

  const addNewTask = () => {
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
    <div className={rootClasses.join(' ')}>
      {/* Inputs */}
      <form>
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
      </form>
      {/* buttons to configure task */}
      <div>
        <button onClick={() => setPriorityVisibility(!priorityVisibility)} className={cl.priorityButton}>Priority</button>
        <Modal visible={priorityVisibility} setVisible={setPriorityVisibility}>
          <button>Priority 1</button>
          <button>Priority 2</button>
          <button>Priority 3</button>
          <button>Priority 4</button>
        </Modal>
      </div>
      {/* sending buttons */}
      <div className={cl.buttons}>
        <button onClick={cancelAdding} className={cl.cancel}>Cancel</button>
        <button onClick={addNewTask} className={cl.addTask}>Add task</button>
      </div>
    </div>
  )
}