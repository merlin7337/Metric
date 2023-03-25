import React, { useState } from 'react'
import cl from './TaskForm.module.scss'
import Modal from '../Modal/Modal'
import { IoIosCheckmark, IoIosFlag, IoCheckmark, IoMdCheckmark } from 'react-icons/io'

export default function TaskForm({create, cancel, isActive, setIsActive}) {

  const [priorityVisibility, setPriorityVisibility] = useState(false)

  const rootClasses = [cl.form]
    if(isActive){
      rootClasses.push(cl.active)
    }
    else if(priorityVisibility){
      rootClasses.push(cl.contextMenuActive)
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
    setPriorityVisibility(false)
    setIsActive(false)
  }

  const addNewTask = () => {
    const newTask = {...task}
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

      {/* Переписать */}
      <div>
        <button className={cl.priorityModalButton} onClick={() => setPriorityVisibility(!priorityVisibility)}>
          <IoIosFlag className={[cl.flagIcon, cl[`p${task.priority}`]].join(' ')}/>
          Priority
        </button>
        <Modal visible={priorityVisibility} setVisible={setPriorityVisibility}>
          <button className={cl.priorityButton} onClick={() => setTask({...task, priority: 1})}>
            <IoIosFlag className={[cl.flagIcon, cl['p1']].join(' ')}/>
            Priority 1
            {task.priority === 1 && <IoMdCheckmark className={cl.checkmarkIcon}/>}
          </button>
          <button className={cl.priorityButton} onClick={() => setTask({...task, priority: 2})}>
            <IoIosFlag className={[cl.flagIcon, cl['p2']].join(' ')}/>
            Priority 2
            {task.priority === 2 && <IoMdCheckmark className={cl.checkmarkIcon}/>}
          </button>
          <button className={cl.priorityButton} onClick={() => setTask({...task, priority: 3})}>
            <IoIosFlag className={[cl.flagIcon, cl['p3']].join(' ')}/>
            Priority 3
            {task.priority === 3 && <IoMdCheckmark className={cl.checkmarkIcon}/>}
          </button>
          <button className={cl.priorityButton} onClick={() => setTask({...task, priority: 4})}>
            <IoIosFlag className={[cl.flagIcon, cl['p4']].join(' ')}/>
            Priority 4
            {task.priority === 4 && <IoMdCheckmark className={cl.checkmarkIcon}/>}
          </button>
        </Modal>
      </div>
      {/* Переписать */}

      {/* sending buttons */}
      <div className={cl.buttons}>
        <button onClick={cancelAdding} className={cl.cancel}>Cancel</button>
        <button onClick={addNewTask} className={cl.addTask}>Add task</button>
      </div>
    </div>
  )
}