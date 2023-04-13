import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routes/Router";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { SidebarContext } from "./context";
import { TasksProvider } from "./hooks/useTasks";

function App() {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sidebarVisibility,
        setSidebarVisibility,
      }}
    >
      <TasksProvider>
        <BrowserRouter>
          <Navbar />
          <div className="App">
            <Sidebar />
            <Router />
          </div>
        </BrowserRouter>
      </TasksProvider>
    </SidebarContext.Provider>
  );
}

export default App;
