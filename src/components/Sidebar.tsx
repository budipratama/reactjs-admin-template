import { JSX, useState, memo } from "react";
import "../styles/components/_sidebar.scss";
import logoProfile from "../assets/images/user-1.jpg";
import { useLocation, Link } from "react-router-dom";
import path from "path";

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
  isTablet: boolean;
  isDesktop: boolean;
}

const Sidebar = ({
  isCollapsed,
  onSidebarHover,
  isTablet,
  isDesktop,
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
    // {
    //   icon: "fa-solid fa-user",
    //   title: "General",
    //   children: [
    //     {
    //       icon: "fa-solid fa-user",
    //       title: "Profile",
    //       path: "/profile",
    //     },
    //     {
    //       icon: "fa-solid fa-user",
    //       title: "Settings",
    //       children: [
    //         {
    //           icon: "fa-solid fa-user",
    //           title: "Account",
    //           path: "/settings/account",
    //         },
    //         {
    //           icon: "fa-solid fa-user",
    //           title: "Privacy",
    //           children: [
    //             {
    //               icon: "fa-solid fa-user",
    //               title: "Security",
    //             },
    //             {
    //               icon: "fa-solid fa-user",
    //               title: "Notification",
    //             },
    //             {
    //               icon: "fa-solid fa-user",
    //               title: "Language",
    //               path: "/language",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   icon: "fa-solid fa-user",
    //   title: "Basic",
    //   path: "/basic",
    // },
    // {
    //   icon: "fa-solid fa-user",
    //   title: "Analytic",
    //   path: "/analytic",
    // },
    // {
    //   icon: "fa-solid fa-user",
    //   title: "Campaign",
    //   path: "/campaign",
    // },
    // {
    //   icon: "fa-solid fa-user",
    //   title: "Modern",
    //   path: "/modern",
    // },
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
    isRoot = false
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
            renderMenu={renderMenu}
          />
        ))}
      </ul>
    );

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
