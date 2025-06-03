import React, { JSX, useState } from "react";
import { useSeo } from "../utils/seo";
import "../styles/pages/_login.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginPhoto from "../assets/images/login-photo.jpg";
import logoProfile from "../assets/images/user-1.jpg";

const LockScreen = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const { setIsLoggedIn, username, setUsername, setIsLockScreen } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    console.log("handleLogin", username);
    e.preventDefault();

    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setIsLockScreen(false);
      setUsername(username);
      navigate("/profile");
    } else {
      alert("Username atau password salah!");
    }
  };

  useSeo({
    title: "Lock Screen",
    description: "Halaman lock screen",
    keywords: "lock screen, security",
  });

  return (
    <>
      <div className='scroll-down__login'>
        SCROLL DOWN
        <svg
          className='scroll__icon'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 32 32'>
          <path d='M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z' />
        </svg>
      </div>
      <div className='container'></div>
      <div className={`modal is-open`}>
        <div className='modal-container'>
          <div className='modal-left'>
            <h1 className='modal-title'>Lock Screen</h1>
            <p className='modal-desc'>
              Enter your password to unlock the screen!
            </p>
            <div className='modal-profile'>
              <img
                src={logoProfile}
                alt='User Avatar'
                className='modal-avatar'
              />
            </div>
            <form onSubmit={handleLogin}>
              <div className='input-block'>
                <label htmlFor='password' className='input-label'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='modal-buttons'>
                <button className='input-button'>Unlock</button>
              </div>
            </form>
            <p className='sign-in'>
              Not you ? return to{" "}
              <a
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("username");
                  localStorage.removeItem("isLockScreen");
                  setIsLoggedIn(false);
                  setIsLockScreen(false);
                  navigate("/");
                }}>
                Signin
              </a>
            </p>
          </div>
          <div className='modal-right'>
            <img src={loginPhoto} alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export default LockScreen;
