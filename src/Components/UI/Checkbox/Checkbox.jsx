import React, { useState } from "react";
import cl from "./Checkbox.module.scss";
import { IoIosCheckmark, IoIosCheckmarkCircle } from "react-icons/io";

export default function Checkbox({ priority, deleteTask, task }) {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxClasses = [cl.checkbox, cl[`p${priority}`]];
  if (isChecked) {
    checkboxClasses.push(cl.checked);
  }
  const checkmarkClasses = [cl.checkmarkIcon, cl[`p${priority}`]].join(" ");

  let icon;
  isChecked
    ? (icon = <IoIosCheckmarkCircle className={checkmarkClasses} />)
    : (icon = <IoIosCheckmark className={checkmarkClasses} />);

  return (
    <div className={cl.checkboxContainer}>
      <button
        className={checkboxClasses.join(" ")}
        onClick={() => {
          setIsChecked(!isChecked);
          deleteTask(task);
        }}
      >
        {icon}
      </button>
    </div>
  );
}
