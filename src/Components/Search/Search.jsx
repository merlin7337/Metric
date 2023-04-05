import React, { useState } from "react";
import cl from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../Dropdown/Dropdown";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const handleChangeSearchText = (e) => {
    setSearchText(e.currentTarget.value);
    e.currentTarget.value === ""
      ? setDropdownVisibility(false)
      : setDropdownVisibility(true);
  };

  return (
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
      <Dropdown
        className={cl.dropdown}
        visibility={dropdownVisibility}
        setVisibility={setDropdownVisibility}
      >
        <div>No results</div>
      </Dropdown>
    </div>
  );
}
