import React from "react";
import cl from "./Dropdown.module.scss";

export default function Dropdown({ children, visibility, setVisibility }) {
  const rootClasses = [cl.dropdown];
  if (visibility) {
    rootClasses.push(cl.active);
  }
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisibility(false)}>
      <div className={cl.dropdownContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
