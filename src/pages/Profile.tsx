import { JSX, useRef, useState } from "react";
import { useSeo } from "../utils/seo";
import "../styles/pages/_profile.scss";
import logoProfile from "../assets/images/user-1.jpg";

const Profile = (): JSX.Element => {
  useSeo({
    title: "Profile",
    description: "Halaman profile pengguna",
    keywords: "profile, user",
  });
  const overviewRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "activities">(
    "overview"
  );

  const handleTabClick = (tab: "overview" | "activities") => {
    setActiveTab(tab);
    const ref = tab === "overview" ? overviewRef : activitiesRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className='profile'>
        <div className='profile__header'>
          <div className='profile__background'>
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
                    <i className='fa-solid fa-location-dot'></i> California,
                    United States
                  </p>

                  <p className='profile__info--address'>
                    <i className='fa-solid fa-phone'></i>6282297323945
                  </p>
                </span>
              </div>
            </div>
            <div className='profile__subsection'>
              <ul>
                <li
                  className={`profile__subsection--item${
                    activeTab === "overview" ? " active" : ""
                  }`}>
                  <a
                    href='#overview'
                    role='tab'
                    aria-selected={activeTab === "overview"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick("overview");
                    }}>
                    Overview
                  </a>
                </li>
                <li
                  className={`profile__subsection--item${
                    activeTab === "activities" ? " active" : ""
                  }`}>
                  <a
                    href='#activities'
                    role='tab'
                    aria-selected={activeTab === "activities"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick("activities");
                    }}>
                    Activities
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='tab__content'>
          <div
            className={`tab__pane${activeTab === "overview" ? " active" : ""}`}
            id='overview'
            ref={overviewRef}>
            <div className='tab__paneprogress'>
              <h2>Complete Your Profile</h2>
              <div className='progress stripes'>
                <div
                  className='progress__bar bg-danger'
                  style={{ width: "30%" }}
                  // role='progress'
                  // style='width: 30%'
                  // aria-valuenow='30'
                  // aria-valuemin='0'
                  // aria-valuemax='100'
                >
                  <div className='progress__fill'>
                    <span className='progress__label'>30%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab__paneinfo'>
              <h2>Info</h2>
              <table className='table'>
                <thead className='hide'>
                  <tr>
                    <th scope='col'>Field</th>
                    <th scope='col'>Value</th>
                  </tr>
                </thead>
                <tbody className='table__body'>
                  <tr>
                    <td>
                      <i className='fa-solid fa-user'></i> Full Name
                    </td>
                    <td>Budi Pratama</td>
                  </tr>
                  <tr>
                    <td>
                      <i className='fa-solid fa-envelope'></i>Email
                    </td>
                    <td>budi@gmail.com</td>
                  </tr>
                  <tr>
                    <td>
                      <i className='fa-solid fa-phone'></i>Phone
                    </td>
                    <td>6282297323945</td>
                  </tr>
                  <tr>
                    <td>
                      <i className='fa-solid fa-location-dot'></i>Address
                    </td>
                    <td>California, United States</td>
                  </tr>
                  <tr>
                    <td>
                      <i className='fa-solid fa-crown'></i>Role
                    </td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>
                      <i className='fa-solid fa-right-to-bracket'></i>Joined
                    </td>
                    <td>January 1, 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={`tab__pane${
              activeTab === "activities" ? " active" : ""
            }`}
            id='activities'
            ref={activitiesRef}>
            <div className='tab__paneprogress'>
              <h2>Activities Timeline</h2>
              <ul className='timeline'>
                <li className='timeline--item'>
                  <span className='timeline--point'></span>
                  <div className='timeline__header'>
                    <h3>
                      Profile Updated <small>19 min ago</small>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quis ratione veritatis quaerat ipsum dignissimos saepe
                      tempora asperiores provident quae exercitationem voluptas,
                      fugit aspernatur fugiat. Temporibus assumenda quidem nulla
                      provident enim?
                    </p>
                  </div>
                </li>
                <li className='timeline--item'>
                  <span className='timeline--point'></span>
                  <div className='timeline__header'>
                    <h3>
                      User Created <small>21 min ago</small>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam placeat facilis nemo! Tempora similique distinctio
                      praesentium quibusdam aut debitis et maiores! Est ea porro
                      cumque et nemo, aspernatur ipsum eveniet!
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Recusandae similique itaque modi, est tempore ut beatae
                      sunt ipsum a delectus saepe fugit aliquam, atque, voluptas
                      accusantium architecto voluptatum soluta ratione!
                    </p>
                  </div>
                </li>
                <li className='timeline--item'>
                  <span className='timeline--point'></span>
                  <div className='timeline__header'>
                    <h3>
                      Allowed IP Updated <small>30 min ago</small>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Recusandae similique itaque modi, est tempore ut beatae
                      sunt ipsum a delectus saepe fugit aliquam, atque, voluptas
                      accusantium architecto voluptatum soluta ratione!
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Recusandae similique itaque modi, est tempore ut beatae
                      sunt ipsum a delectus saepe fugit aliquam, atque, voluptas
                      accusantium architecto voluptatum soluta ratione!
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Profile;
