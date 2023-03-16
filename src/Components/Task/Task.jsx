import React, { useRef } from 'react'
import cl from './Task.module.css'
import more from '../../Images/UI Icons/more.svg'
import { ReactSVG } from 'react-svg'
import Popup from '../Popup/Popup'

const buttons = ["First button", "Second button", "Third button", "Fourth button"]

export default function Task(props) {
  const buttonRef = useRef(null);

  const checkboxClasses = [cl.checkbox]
  if (props.priority === 4) {
    checkboxClasses.push(cl.p4)
  }
  else if(props.priority === 3) {
    checkboxClasses.push(cl.p)
  }
  else if(props.priority === 2) {
    checkboxClasses.push(cl.p2)
  }
  else if(props.priority === 1) {
    checkboxClasses.push(cl.p1)
  }
  
  return (
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <form>
          <label className={cl.container}>
            <input type='checkbox'/>
            <span className={checkboxClasses.join(' ')}></span>
            <div>
              <div className={cl.title}>{props.title}</div>
              <div>{props.description}</div>
            </div>
          </label>
        </form>
      </div>
      <div className={cl.taskRight}>
        <button className={cl.more} ref={buttonRef}>
          <ReactSVG src={more} className={cl.svg}/>
        </button>
        <Popup containerRef={buttonRef}>
          {buttons.map((text, key) => (
            <button key={key} className={cl.popupButton}>{text}</button>
          ))}
        </Popup>
      </div>
    </div>
  )
}

