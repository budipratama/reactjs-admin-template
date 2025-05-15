import { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Header />
    <main>
      <Sidebar />
      <div className='contain'>{children}</div>
    </main>
  </>
);

export default MainLayout;
