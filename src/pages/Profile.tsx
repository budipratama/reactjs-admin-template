import { JSX, useRef } from "react";
import { useSeo } from "../utils/seo";
import "../styles/pages/_profile.scss";
import logoProfile from "../assets/images/user-1.jpg";
import bgProfile from "../assets/images/bg-profile.jpg";

interface ProfileProps {
  setIsLoggedIn: (value: boolean) => void;
}
const Profile = ({ setIsLoggedIn }: ProfileProps): JSX.Element => {
  useSeo({
    title: "Profile",
    description: "Halaman profile pengguna",
    keywords: "profile, user",
  });
  const overviewRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: "overview" | "activities") => {
    const ref = tab === "overview" ? overviewRef : activitiesRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className='profile'>
        <div className='profile__header'>
          <div className='profile__background'>
            <img
              src={bgProfile}
              alt='Profile Background'
              className='profile__background--img'
            />
          </div>
        </div>
        <div className='profile__content'>
          <div className='profile__avatar'>
            <img
              src={logoProfile}
              alt='User Avatar'
              className='profile__avatar--img'
            />
          </div>
          <div className='profile__info'>
            <h2 className='profile__info--name'>Budi Pratama</h2>
            <p className='profile__info--role'>Admin</p>
            <span className='profile__info--additional'>
              <p className='profile__info--address'>
                <i className='fa-solid fa-location-dot'></i> California, United
                States
              </p>

              <p className='profile__info--address'>
                <i className='fa-solid fa-phone'></i>6282297323945
              </p>
            </span>
          </div>
          <div className='profile__actions'>
            <button
              className='profile__actions--btn'
              onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          </div>
        </div>
        <div className='profile__subsection'>
          <ul>
            <li className='profile__subsection--item active'>
              <a
                href='#overview'
                role='tab'
                aria-selected='true'
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("overview");
                }}>
                Overview
              </a>
            </li>
            <li className='profile__subsection--item'>
              <a
                href='#activities'
                role='tab'
                aria-selected='false'
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("activities");
                }}>
                Activities
              </a>
            </li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-pane active' id='overview' ref={overviewRef}>
            <h3>Profile Overview</h3>
            <p>
              This is the profile overview section where you can see your
              personal information, activities, and other details.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className='tab-pane' id='activities' ref={activitiesRef}>
            <h3>Activities</h3>
            <p>
              This section shows your recent activities, including posts,
              comments, and interactions.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Profile;
