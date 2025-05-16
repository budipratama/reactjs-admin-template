import { JSX } from "react";
import "../styles/components/_sidebar.scss";
import logoProfile from "../assets/images/user-1.jpg";
import { useLocation, Link } from "react-router-dom";
const Sidebar = (): JSX.Element => {
  console.log("Sidebar", Math.floor(Math.random() * (100 - 1 + 1)) + 1);
  const location = useLocation();
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
          path: "/settings",
          children: [
            {
              icon: "fa-solid fa-user",
              title: "Account",
              path: "/settings/account",
            },
            {
              icon: "fa-solid fa-user",
              title: "Privacy",
              path: "/settings/privacy",
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

  const renderMenu = (items: any[]) => {
    return (
      <ul>
        {items.map((item, index) => {
          const isActive = item.path && location.pathname === item.path;
          let className = "";
          if (isActive) {
            className = "sidebar__active";
          } else if (item.children) {
            className = "sidebar__has--child";
          }

          return (
            <li key={index} className={className}>
              <i className={item.icon}></i>
              {item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                item.title
              )}
              {item.children ? <i className='fa-solid fa-angle-left'></i> : ""}
              {item.children && renderMenu(item.children)}
            </li>
          );
        })}
      </ul>
    );
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
      {renderMenu(menu)}
    </aside>
  );
};

export default Sidebar;
