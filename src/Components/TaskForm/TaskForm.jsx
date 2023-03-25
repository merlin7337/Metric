import React, { useState } from 'react'
import cl from './TaskForm.module.scss'
import Modal from '../Modal/Modal'
import { IoIosFlag, IoMdCheckmark } from 'react-icons/io'
import uuid from 'react-uuid'

export default function TaskForm({ create, cancel, isActive, setIsActive }) {

  const [priorityVisibility, setPriorityVisibility] = useState(false)

  const rootClasses = [cl.form]
  if (isActive) {
    rootClasses.push(cl.active)
  }
  else if (priorityVisibility) {
    rootClasses.push(cl.contextMenuActive)
  }

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: undefined,
    priority: 4,
    assignedProject: undefined,
  })

  const cancelAdding = () => {
    cancel()
    setTask({
      title: '',
      description: '',
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    })
    setPriorityVisibility(false)
    setIsActive(false)
  }

  const addNewTask = () => {
    const newTask = { ...task, id: uuid() }
    create(newTask)
    setTask({
      title: '',
      description: '',
      dueDate: undefined,
      priority: 4,
      assignedProject: undefined,
    })
    setPriorityVisibility(false)
    setIsActive(false)
  }

  const priorityButtons = Array.from({ length: 4 }).map((_, i) => {
    const priority = i + 1
    return (
      <button className={cl.priorityButton} onClick={() => {setTask({ ...task, priority }); setPriorityVisibility(false)}}>
        <IoIosFlag className={[cl.flagIcon, cl[`p${priority}`]].join(' ')} />
        Priority {priority}
        {task.priority === priority && <IoMdCheckmark className={cl.checkmarkIcon} />}
      </button>
    )
  })
  
  return (
    <div className={rootClasses.join(' ')}>
      <form>
        <input
          type='text'
          placeholder='Task name'
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
          className={cl.input}
        />
        <input
          type='text'
          placeholder='Description'
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          className={cl.input}
        />
      </form>
      <div>
        <button className={cl.priorityModalButton} onClick={() => setPriorityVisibility(!priorityVisibility)}>
          <IoIosFlag className={[cl.flagIcon, cl[`p${task.priority}`]].join(' ')} />
          Priority
        </button>
        <Modal visible={priorityVisibility} setVisible={setPriorityVisibility}>
          {priorityButtons}
        </Modal>
      </div>
      <div className={cl.buttons}>
        <button onClick={cancelAdding} className={cl.cancel}>Cancel</button>
        <button onClick={addNewTask} className={cl.addTask}>Add task</button>
      </div>
    </div>
  )
}