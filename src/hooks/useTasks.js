import { useContext, createContext, useState, useEffect } from "react";

const TasksContext = createContext(null);

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const handleSetTasks = (e) => {
    const copy = [...e];
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
  };

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    const candidate = data ? JSON.parse(data) : [];
    if (data && candidate.length) {
      setTasks(candidate);
    }
  }, []);

  return { tasks, handleSetTasks };
};

export const TasksProvider = ({ children }) => {
  const { tasks, handleSetTasks } = useTasks();
  return (
    <TasksContext.Provider value={[tasks, handleSetTasks]}>
      {children}
    </TasksContext.Provider>
  );
};

export default function Import() {
  return useContext(TasksContext);
}
