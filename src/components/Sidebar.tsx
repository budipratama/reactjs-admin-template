import { JSX, useState } from "react";
import "../styles/components/_sidebar.scss";
import logoProfile from "../assets/images/user-1.jpg";
import { useLocation, Link } from "react-router-dom";

const Sidebar = (): JSX.Element => {
  const SIDEBAR_ACTIVE = "sidebar__active";
  const SIDEBAR_HAS_CHILD = "sidebar__has--child";
  console.log("Sidebar", Math.floor(Math.random() * (100 - 1 + 1)) + 1);
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
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
                  // path: "/language",
                  path: "/dashboard",
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
        {items.map((item, index) => {
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
          console.log("renderMenu openMenus", openMenus);
          const isOpen = openMenus.includes(key);

          console.log("renderMenu index", index, key, isOpen);
          return (
            <li key={index} className={className}>
              <i className={item.icon}></i>
              {item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                item.title
              )}
              {item.children ? (
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: 8,
                    position: "absolute",
                    right: 0,
                    top: "10px",
                  }}
                  onClick={() => handleToggle(key)}>
                  <i
                    className={`fa-solid fa-angle-${isOpen ? "down" : "left"}`}></i>
                </span>
              ) : null}
              {item.children &&
                isOpen &&
                renderMenu(item.children, [...parentIndexes, index])}
            </li>
          );
        })}
      </ul>
    );
    if (isRoot) {
      console.timeEnd("renderMenu");
    }
    return result;
  };

  return (
    <aside className='sidebar'>
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
