import { ReactNode, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

interface MainLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const MainLayout = ({
  children,
  showBreadcrumb = true,
  setIsLoggedIn,
}: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  return (
    <>
      <Header
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        sidebarHovered={sidebarHovered}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onSidebarHover={setSidebarHovered}
        />
        <div className='contain'>
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
