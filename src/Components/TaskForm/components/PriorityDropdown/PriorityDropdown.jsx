import React from "react";
import { IoIosFlag, IoMdCheckmark } from "react-icons/io";
import Dropdown from "../../../Dropdown/Dropdown";
import cl from "./PriorityDropdown.module.scss";

export default function PriorityDropdown({
  priority,
  setPriority,
  priorityVisibility,
  setPriorityVisibility,
}) {
  const priorityButtons = Array.from({ length: 4 }).map((_, i) => {
    const buttonPriority = i + 1;

    return (
      <button
        key={i}
        className={cl.priorityButton}
        onClick={() => {
          setPriority(buttonPriority);
          setPriorityVisibility(false);
        }}
      >
        <IoIosFlag
          className={[cl.flagIcon, cl[`p${buttonPriority}`]].join(" ")}
        />
        Priority {buttonPriority}
        {buttonPriority === priority && (
          <IoMdCheckmark className={cl.checkmarkIcon} />
        )}
      </button>
    );
  });

  return (
    <div className={cl.priorityContainer}>
      <button
        className={cl.priorityModalButton}
        onClick={() => setPriorityVisibility(!priorityVisibility)}
      >
        <IoIosFlag className={[cl.flagIcon, cl[`p${priority}`]].join(" ")} />
        Priority
      </button>
      <Dropdown mix={cl.dropdown} visibility={priorityVisibility}>
        {priorityButtons}
      </Dropdown>
    </div>
  );
}
