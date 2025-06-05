import { JSX, useRef, useState } from "react";
import { useSeo } from "../utils/seo";
import "../styles/pages/_profile.scss";
import "../styles/components/_grid.scss";
import "../styles/components/_form.scss";
import "../styles/components/_alert.scss";
import logoProfile from "../assets/images/user-1.jpg";

const AccountSettings = (): JSX.Element => {
  useSeo({
    title: "Account Settings",
    description: "Halaman account settings pengguna",
    keywords: "account, settings, user",
  });
  const overviewRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"personal-details" | "activities">(
    "personal-details"
  );

  const handleTabClick = (tab: "personal-details" | "activities") => {
    setActiveTab(tab);
    const ref = tab === "personal-details" ? overviewRef : activitiesRef;
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
                    activeTab === "personal-details" ? " active" : ""
                  }`}>
                  <a
                    href='#personal-details'
                    role='tab'
                    aria-selected={activeTab === "personal-details"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick("personal-details");
                    }}>
                    Personal Details
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
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='tab__content'>
          <div
            className={`tab__pane${activeTab === "personal-details" ? " active" : ""}`}
            id='personal-details'
            ref={overviewRef}>
            <div className='tab__paneinfo'>
              <form className='form'>
                <div className='alert alert--info'>
                  <i className='fa-solid fa-info-circle'></i>
                  <span>General.</span>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='name' className='form__label'>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='form__input'
                      placeholder='Enter your name'
                    />
                  </div>

                  <div className='col-6'>
                    <label htmlFor='gender' className='form__label'>
                      Gender
                    </label>
                    <input
                      type='text'
                      id='gender'
                      className='form__input'
                      placeholder='Enter your gender'
                    />
                  </div>
                </div>

                <div className='alert alert--info'>
                  <i className='fa-solid fa-info-circle'></i>
                  <span>Contacts.</span>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='email' className='form__label'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='form__input'
                      placeholder='Enter your mail'
                    />
                  </div>
                  <div className='col-6'>
                    <label htmlFor='phone_number' className='form__label'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      id='phone_number'
                      className='form__input'
                      placeholder='Enter your phone number'
                    />
                  </div>
                </div>

                <div className='alert alert--info'>
                  <i className='fa-solid fa-info-circle'></i>
                  <span>Address.</span>
                </div>

                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='street' className='form__label'>
                      Street
                    </label>
                    <input
                      type='text'
                      id='street'
                      className='form__input'
                      placeholder='Enter your street'
                    />
                  </div>
                  <div className='col-6'>
                    <label htmlFor='city' className='form__label'>
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      className='form__input'
                      placeholder='Enter your city'
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='state' className='form__label'>
                      State
                    </label>
                    <input
                      type='text'
                      id='state'
                      className='form__input'
                      placeholder='Enter your state'
                    />
                  </div>
                  <div className='col-6'>
                    <label htmlFor='post_code' className='form__label'>
                      Post Code
                    </label>
                    <input
                      type='text'
                      id='post_code'
                      className='form__input'
                      placeholder='Enter your post_code'
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='country' className='form__label'>
                      Country
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='form__input'
                      placeholder='Enter your country'
                    />
                  </div>
                </div>
              </form>
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

export default AccountSettings;
