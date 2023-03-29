import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./Routes/Router";
import Navbar from "./Components/UI/Navbar/Navbar";
import Sidebar from "./Components/UI/Sidebar/Sidebar";
import { AuthContext, SidebarContext, ThemeContext } from "./Context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
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
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
