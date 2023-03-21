import React, { useState } from 'react'
import cl from './Checkbox.module.scss'
import { IoIosCheckmark, IoIosCheckmarkCircle } from "react-icons/io"

export default function Checkbox() {
    const [isChecked, setIsChecked] = useState(false)
    const checkboxClasses = [cl.checkbox]

    let icon
    isChecked 
    ? 
    icon = <IoIosCheckmarkCircle className={cl.checkmarkIcon}/> 
    : 
    icon = <IoIosCheckmark className={cl.checkmarkIcon}/>

    return (
    <div className={cl.checkboxContainer}>
        <button className={checkboxClasses} onClick={() => setIsChecked(!isChecked)}>
            {icon}
        </button>
    </div>
  )
}
