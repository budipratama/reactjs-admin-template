import { ReactNode, useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth < 1200;
  const isDesktop = windowWidth > 1200;
  console.log("MainLayout isTablet:", isTablet);
  return (
    <>
      <Header
        isTablet={isTablet}
        isDesktop={isDesktop}
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        sidebarHovered={sidebarHovered}
      />
      <main>
        <Sidebar
          isTablet={isTablet}
          isCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
          setSidebarCollapsed={setSidebarCollapsed}
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
