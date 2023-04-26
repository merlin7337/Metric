import { HashRouter, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routes/Router";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { TasksProvider } from "./hooks/useTasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SidebarProvider } from "./hooks/useSidebar";
import Inbox from "./views/Inbox/Inbox";
import Today from "./views/Today/Today";
import Upcoming from "./views/Upcoming/Upcoming";
import Overdue from "./views/Overdue/Overdue";

function App() {
  const router = createHashRouter([
    { path: "/*", element: <Today /> },
    { path: "/inbox", element: <Inbox /> },
    { path: "/today", element: <Today /> },
    { path: "/upcoming", element: <Upcoming /> },
    { path: "/overdue", element: <Overdue /> },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SidebarProvider>
        <TasksProvider>
          <HashRouter>
            <Navbar />
            <div className="App">
              <Sidebar />
              <RouterProvider router={router} />
            </div>
          </HashRouter>
        </TasksProvider>
      </SidebarProvider>
    </LocalizationProvider>
  );
}

export default App;
