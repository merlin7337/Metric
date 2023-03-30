import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routes/Router";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { SidebarContext } from "./context";

function App() {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  return (
        <SidebarContext.Provider
          value={{
            isSidebarShown,
            setIsSidebarShown,
          }}
        >
          <BrowserRouter>
            <Navbar />
            <div className="App">
              <Sidebar />
              <Router />
            </div>
          </BrowserRouter>
        </SidebarContext.Provider>
  );
}

export default App;
