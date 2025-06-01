import { ReactNode, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

interface MainLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

const MainLayout = ({ children, showBreadcrumb = true }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  return (
    <>
      <Header
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        sidebarHovered={sidebarHovered}
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
