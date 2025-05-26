import { ReactNode, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  return (
    <>
      <Header
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <main>
        <Sidebar isCollapsed={sidebarCollapsed} />
        <div className='contain'>{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
