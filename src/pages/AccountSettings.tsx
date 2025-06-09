import { JSX, useRef, useState } from "react";
import { useSeo } from "../utils/seo";
import "../styles/pages/_profile.scss";
import "../styles/components/_grid.scss";
import "../styles/components/_form.scss";
import "../styles/components/_alert.scss";
import logoProfile from "../assets/images/user-1.jpg";
import FormField from "../components/FormField";

const AccountSettings = (): JSX.Element => {
  useSeo({
    title: "Account Settings",
    description: "Halaman account settings pengguna",
    keywords: "account, settings, user",
  });
  const overviewRef = useRef<HTMLDivElement>(null);
  const changePasswordRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "personal-details" | "change-password"
  >("personal-details");

  const handleTabClick = (tab: "personal-details" | "change-password") => {
    setActiveTab(tab);
    const ref = tab === "personal-details" ? overviewRef : changePasswordRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // State untuk visibility password
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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
                    activeTab === "change-password" ? " active" : ""
                  }`}>
                  <a
                    href='#change-password'
                    role='tab'
                    aria-selected={activeTab === "change-password"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick("change-password");
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
            className={`tab__pane${
              activeTab === "personal-details" ? " active" : ""
            }`}
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
                  {/* <div className='col-6'>
                    <label htmlFor='post_code' className='form__label'>
                      Post Code
                    </label>
                    <input
                      type='text'
                      id='post_code'
                      className='form__input'
                      placeholder='Enter your post_code'
                    />
                  </div> */}
                  <FormField
                    label='Post Code'
                    id='post_code'
                    type='text'
                    containerClassName='col-6'
                    placeholder='Enter your post code'
                  />
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
              activeTab === "change-password" ? " active" : ""
            }`}
            id='change-password'
            ref={changePasswordRef}>
            <div className='tab__paneprogress'>
              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='current_password'>Current Password</label>
                  <div>
                    <input
                      type='password'
                      className='form__input'
                      placeholder='Enter your current password'
                      style={{ width: "100%" }}
                      id='current_password'
                    />
                    <button
                      type='button'
                      className='form__toggle-password'
                      // style={{ position: "absolute", right: 24, top: 38 }}
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }>
                      {showPassword ? (
                        <i className='fa-solid fa-eye'></i>
                      ) : (
                        <i className='fa-solid fa-eye-slash'></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6' style={{ position: "relative" }}>
                  <FormField
                    label='New Password'
                    id='new_password'
                    type={showNewPassword ? "text" : "password"}
                    className='form__input'
                    placeholder='Enter your new password'
                    containerClassName=''
                  />
                  <button
                    type='button'
                    className='form__toggle-password'
                    style={{ position: "absolute", right: 24, top: 15 }}
                    onClick={() => setShowNewPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }>
                    {showNewPassword ? (
                      <i className='fa-solid fa-eye'></i>
                    ) : (
                      <i className='fa-solid fa-eye-slash'></i>
                    )}
                  </button>
                </div>
                <div className='col-6' style={{ position: "relative" }}>
                  <FormField
                    label='Confirm New Password'
                    id='confirm_new_password'
                    type={showConfirmNewPassword ? "text" : "password"}
                    className='form__input'
                    placeholder='Enter your confirm new password'
                    containerClassName=''
                  />
                  <button
                    type='button'
                    className='form__toggle-password'
                    style={{ position: "absolute", right: 24, top: 38 }}
                    onClick={() => setShowConfirmNewPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={
                      showConfirmNewPassword ? "Hide password" : "Show password"
                    }>
                    {showConfirmNewPassword ? (
                      <i className='fa-solid fa-eye'></i>
                    ) : (
                      <i className='fa-solid fa-eye-slash'></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default AccountSettings;
