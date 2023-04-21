import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routes/Router";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { SidebarContext } from "./context";
import { TasksProvider } from "./hooks/useTasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}

export default App;
