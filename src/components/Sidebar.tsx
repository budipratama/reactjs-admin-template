import { JSX, useState, memo, useEffect } from "react";
import "../styles/components/_sidebar.scss";
import logoProfile from "../assets/images/user-1.jpg";
import { useLocation, Link } from "react-router-dom";

// Komponen MenuItem dengan memo
const MenuItem = memo(function MenuItem({
  item,
  index,
  parentIndexes,
  location,
  openMenus,
  handleToggle,
  getMenuKey,
  SIDEBAR_ACTIVE,
  SIDEBAR_HAS_CHILD,
  isMenuActive,
  renderMenu,
  setSidebarCollapsed,
  isTablet,
}: any) {
  const active = isMenuActive(item, location.pathname);
  let className = "";
  if (active) {
    className = item.children
      ? `${SIDEBAR_ACTIVE} ${SIDEBAR_HAS_CHILD}`
      : `${SIDEBAR_ACTIVE}`;
  } else if (item.children) {
    className = `${SIDEBAR_HAS_CHILD}`;
  }
  const key = getMenuKey([...parentIndexes, index]);
  const isOpen = openMenus.includes(key);
  return (
    <li key={index} className={className}>
      <Link
        to={item.path ?? "#"}
        onClick={() => {
          if (isTablet && typeof setSidebarCollapsed === "function") {
            setSidebarCollapsed(true); // collapse sidebar jika tablet
          }
        }}>
        <i className={item.icon}></i>
        <span>{item.title}</span>
      </Link>

      {item.children ? (
        <button className='sidebar__toggle' onClick={() => handleToggle(key)}>
          <i className={`fa-solid fa-angle-${isOpen ? "down" : "left"}`}></i>
        </button>
      ) : null}
      {item.children &&
        isOpen &&
        renderMenu(item.children, [...parentIndexes, index])}
    </li>
  );
});

interface SidebarProps {
  isCollapsed?: boolean;
  onSidebarHover?: (hovered: boolean) => void;
  onToggleSidebar?: () => void;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  isTablet: boolean;
}

const Sidebar = ({
  isCollapsed,
  onSidebarHover,
  onToggleSidebar,
  setSidebarCollapsed,
  isTablet,
}: SidebarProps): JSX.Element => {
  const SIDEBAR_ACTIVE = "sidebar__active";
  const SIDEBAR_HAS_CHILD = "sidebar__has--child";
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const menu = [
    {
      icon: "fa-solid fa-user",
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: "fa-solid fa-grip",
      title: "Form Elements",
      children: [
        {
          icon: "fa-solid fa-square",
          title: "Auto complete",
          path: "/form-elements/auto-complete",
        },
        {
          icon: "fa-solid fa-square",
          title: "Button",
          path: "/form-elements/button",
        },
      ],
    },
  ];

  const isMenuActive = (item: any, pathname: string): boolean => {
    if (item.path && item.path === pathname) {
      return true;
    }
    if (item.children) {
      const result = item.children.some((child: any) =>
        isMenuActive(child, pathname)
      );

      return result;
    }

    return false;
  };

  const getMenuKey = (parentIndexes: number[]) => parentIndexes.join("-");

  const handleToggle = (key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderMenu = (
    items: any[],
    parentIndexes: number[] = [],
    setSidebarCollapsed?: (collapsed: boolean) => void
  ) => {
    const result = (
      <ul>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            parentIndexes={parentIndexes}
            location={location}
            openMenus={openMenus}
            handleToggle={handleToggle}
            getMenuKey={getMenuKey}
            SIDEBAR_ACTIVE={SIDEBAR_ACTIVE}
            SIDEBAR_HAS_CHILD={SIDEBAR_HAS_CHILD}
            isMenuActive={isMenuActive}
            renderMenu={(children: any[], parentIdx: number[]) =>
              renderMenu(children, parentIdx, setSidebarCollapsed)
            }
            setSidebarCollapsed={setSidebarCollapsed}
            isTablet={isTablet}
          />
        ))}
      </ul>
    );

    return result;
  };

  const handleMouseEnter = () => {
    if (!isTablet) {
      setHovered(true);
      onSidebarHover && onSidebarHover(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isTablet) {
      setHovered(false);
      onSidebarHover && onSidebarHover(false);
    }
  };
  useEffect(() => {
    if (isTablet) {
      if (setSidebarCollapsed) setSidebarCollapsed(true); // collapse otomatis saat tablet
    } else {
      if (setSidebarCollapsed) setSidebarCollapsed(false); // optional: buka otomatis saat desktop
    }
  }, [isTablet]);
  return (
    <aside
      className={`sidebar${isCollapsed && !hovered ? " collapsed" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className='sidebar__user'>
        <div className='sidebar__user__container'>
          <div className='sidebar__user--img'>
            <img src={logoProfile} alt='user' />
          </div>
        </div>
        <div className='sidebar__user--name'>Budi Pratama</div>
      </div>
      {renderMenu(menu, [], setSidebarCollapsed)}
    </aside>
  );
};

export default Sidebar;
