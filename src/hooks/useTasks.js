import { useCallback, useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const onStorageChange = useCallback(() => {
    const localData = localStorage.getItem("tasks");
    if (localData && localData !== JSON.stringify(tasks)) {
      setTasks(JSON.parse(localData));
    }
  }, []);

  useLayoutEffect(() => {
    const candidate = JSON.parse(localStorage.getItem("tasks"));
    if (localStorage.getItem("tasks") && candidate) {
      setTasks(candidate);
    }

    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
};

export default useTasks;
