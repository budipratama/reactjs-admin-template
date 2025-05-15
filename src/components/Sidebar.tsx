import { JSX } from "react";
import "../styles/components/_sidebar.scss";
import logoProfile from "../assets/images/user-1.jpg";

const Sidebar = (): JSX.Element => {
  const menu = [
    {
      icon: "fa-solid fa-user",
      title: "General",
      children: [
        {
          icon: "fa-solid fa-user",
          title: "Profile",
        },
        {
          icon: "fa-solid fa-user",
          title: "Settings",
          children: [
            {
              icon: "fa-solid fa-user",
              title: "Account",
            },
            {
              icon: "fa-solid fa-user",
              title: "Privacy",
            },
          ],
        },
      ],
    },
    {
      icon: "fa-solid fa-user",
      title: "Basic",
    },
    {
      icon: "fa-solid fa-user",
      title: "Analytic",
    },
    {
      icon: "fa-solid fa-user",
      title: "Campaign",
    },
    {
      icon: "fa-solid fa-user",
      title: "Modern",
    },
  ];

  const renderMenu = (items: any[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <i className={item.icon}></i> {item.title}
            {item.children && renderMenu(item.children)}
          </li>
        ))}
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
