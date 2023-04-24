import React, { useState } from "react";
import cl from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../Dropdown/Dropdown";
import useTasks from "../../hooks/useTasks";
import Task from "../Task/Task";
import { TbMoodSad } from "react-icons/tb";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [tasks, handleSetTasks] = useTasks();

  const handleChangeSearchText = (e) => {
    setSearchText(e.currentTarget.value);
    e.currentTarget.value === ""
      ? setDropdownVisibility(false)
      : setDropdownVisibility(true);
  };

  const deleteTimeout =
    tasks.filter(
      (e) => e.title.includes(searchText) || e.description.includes(searchText)
    ).length === 1
      ? 0
      : 300;

  function deleteTask(task) {
    const newTasks = tasks.filter((e) => e.id !== task.id);
    handleSetTasks(newTasks);
  }

  return (
    <div className={cl.searchContainer}>
      {searchText && (
        <div
          className={cl.screenFiller}
          onClick={() => setSearchText("")}
        ></div>
      )}
      <div className={cl.search}>
        <div className={cl.inputContainer}>
          <FiSearch className={cl.searchIcon} />
          <input
            className={cl.input}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </div>
        {searchText ? (
          <Dropdown mix={cl.dropdown} visibility={dropdownVisibility}>
            <TransitionGroup>
              {tasks.filter(
                (e) =>
                  e.title.includes(searchText) ||
                  e.description.includes(searchText)
              ).length ? (
                tasks
                  .filter(
                    (e) =>
                      e.title.includes(searchText) ||
                      e.description.includes(searchText)
                  )
                  .map((e) => (
                    <CSSTransition
                      key={e.id}
                      timeout={deleteTimeout}
                      classNames="item"
                    >
                      <Task
                        task={e}
                        key={e.id}
                        isSearched={true}
                        tasks={tasks}
                        handleSetTasks={handleSetTasks}
                        deleteTask={deleteTask}
                      />
                    </CSSTransition>
                  ))
              ) : (
                <div className={cl.noResults}>
                  <TbMoodSad className={cl.sadIcon} />
                  No results
                </div>
              )}
            </TransitionGroup>
          </Dropdown>
        ) : null}
      </div>
    </div>
  );
}
