import { useContext, createContext, useState, useEffect } from "react";

const SidebarContext = createContext(null);

const useSidebar = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const handleSetSidebarVisibility = (e) => {
    setSidebarVisibility(e);
    localStorage.setItem("sidebarVisibility", JSON.stringify(e));
  };

  useEffect(() => {
    const data = localStorage.getItem("sidebarVisibility");
    const candidate = data ? JSON.parse(data) : false;
    setSidebarVisibility(candidate);
  }, []);

  return { sidebarVisibility, handleSetSidebarVisibility };
};

export const SidebarProvider = ({ children }) => {
  const { sidebarVisibility, handleSetSidebarVisibility } = useSidebar();
  return (
    <SidebarContext.Provider
      value={[sidebarVisibility, handleSetSidebarVisibility]}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default function Import() {
  return useContext(SidebarContext);
}
