import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../styles/components/_breadcrumb.scss";

const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  profile: "Profile",
  settings: "Settings",
  users: "Users",
  reports: "Reports",
  maintenance: "Maintenance",
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className='breadcrumb'>
      <ul className='breadcrumb__list'>
        <li className='breadcrumb__item'>
          <Link to='/'>Home</Link>
        </li>
        {pathnames.map((segment, idx) => {
          const to = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;
          return (
            <li className='breadcrumb__item' key={to}>
              {isLast ? (
                <span className='breadcrumb__current'>
                  {BREADCRUMB_LABELS[segment] || segment}
                </span>
              ) : (
                <Link to={to}>{BREADCRUMB_LABELS[segment] || segment}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
