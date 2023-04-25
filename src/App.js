import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routes/Router";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { TasksProvider } from "./hooks/useTasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SidebarProvider } from "./hooks/useSidebar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SidebarProvider>
        <TasksProvider>
          <BrowserRouter>
            <Navbar />
            <div className="App">
              <Sidebar />
              <Router />
            </div>
          </BrowserRouter>
        </TasksProvider>
      </SidebarProvider>
    </LocalizationProvider>
  );
}

export default App;
