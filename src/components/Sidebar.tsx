import { JSX, useState, memo } from "react";
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
  console.log("MenuItem", key, isOpen);
  return (
    <li key={index} className={className}>
      <i className={item.icon}></i>
      {item.path ? (
        <Link to={item.path}>{item.title}</Link>
      ) : (
        <span>{item.title}</span>
      )}
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
}

const Sidebar = ({
  isCollapsed,
  onSidebarHover,
}: SidebarProps): JSX.Element => {
  const SIDEBAR_ACTIVE = "sidebar__active";
  const SIDEBAR_HAS_CHILD = "sidebar__has--child";
  console.log("Sidebar", Math.floor(performance.now() * (100 - 1 + 1)) + 1);
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
      icon: "fa-solid fa-user",
      title: "General",
      children: [
        {
          icon: "fa-solid fa-user",
          title: "Profile",
          path: "/profile",
        },
        {
          icon: "fa-solid fa-user",
          title: "Settings",
          children: [
            {
              icon: "fa-solid fa-user",
              title: "Account",
              path: "/settings/account",
            },
            {
              icon: "fa-solid fa-user",
              title: "Privacy",
              children: [
                {
                  icon: "fa-solid fa-user",
                  title: "Security",
                },
                {
                  icon: "fa-solid fa-user",
                  title: "Notification",
                },
                {
                  icon: "fa-solid fa-user",
                  title: "Language",
                  path: "/language",
                  // path: "/dashboard",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      icon: "fa-solid fa-user",
      title: "Basic",
      path: "/basic",
    },
    {
      icon: "fa-solid fa-user",
      title: "Analytic",
      path: "/analytic",
    },
    {
      icon: "fa-solid fa-user",
      title: "Campaign",
      path: "/campaign",
    },
    {
      icon: "fa-solid fa-user",
      title: "Modern",
      path: "/modern",
    },
  ];

  const isMenuActive = (item: any, pathname: string): boolean => {
    if (item.__rootTimerStart === undefined) {
      item.__rootTimerStart = true;
      console.time("isMenuActive");
    }
    if (item.path && item.path === pathname) {
      if (item.__rootTimerStart) {
        console.timeEnd("isMenuActive");
        delete item.__rootTimerStart;
      }
      return true;
    }
    if (item.children) {
      const result = item.children.some((child: any) =>
        isMenuActive(child, pathname)
      );
      if (item.__rootTimerStart) {
        console.timeEnd("isMenuActive");
        delete item.__rootTimerStart;
      }
      return result;
    }
    if (item.__rootTimerStart) {
      console.timeEnd("isMenuActive");
      delete item.__rootTimerStart;
    }
    return false;
  };

  const getMenuKey = (parentIndexes: number[]) => parentIndexes.join("-");

  const handleToggle = (key: string) => {
    console.log("handleToggle", key, openMenus);
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderMenu = (
    items: any[],
    parentIndexes: number[] = [],
    isRoot = false
  ) => {
    if (isRoot) {
      console.time("renderMenu");
    }
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
            renderMenu={renderMenu}
          />
        ))}
      </ul>
    );
    if (isRoot) {
      console.timeEnd("renderMenu");
    }
    return result;
  };

  const handleMouseEnter = () => {
    setHovered(true);
    onSidebarHover && onSidebarHover(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    onSidebarHover && onSidebarHover(false);
  };

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
      {renderMenu(menu, [], true)}
    </aside>
  );
};

export default Sidebar;
