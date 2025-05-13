import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_dashboard.scss"; // Import CSS untuk styling
interface DashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus status login
    setIsLoggedIn(false); // Perbarui state login
    navigate("/"); // Arahkan kembali ke halaman login
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <a href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='163'
            height='23'
            fill='none'>
            <path
              fill='#fff'
              d='m44.445 5.676 3.287 9.281 3.27-9.281h3.463v12.797h-2.646v-3.498l.264-6.038-3.454 9.536h-1.81l-3.446-9.528.264 6.03v3.498H41V5.676zm19.705 10.16h-4.623l-.879 2.637h-2.803l4.763-12.797h2.444l4.79 12.797h-2.804zM60.24 13.7h3.198L61.83 8.91zm17.375-5.888h-3.92v10.66H71.06V7.813H67.19V5.676h10.424zm9.211 5.115h-5.062v3.428h5.941v2.118h-8.578V5.676h8.56v2.136h-5.923v3.05h5.062zm7.163.861h-2.1v4.685h-2.637V5.676h4.755q2.267 0 3.498 1.01 1.23 1.011 1.23 2.857 0 1.31-.57 2.188-.564.87-1.715 1.39l2.769 5.229v.123h-2.83zm-2.1-2.136h2.127q.993 0 1.538-.5.545-.51.545-1.398 0-.905-.519-1.424-.51-.518-1.573-.518h-2.118zm11.663 6.82h-2.637V5.677h2.637zm9.835-2.636h-4.623l-.879 2.637h-2.804l4.764-12.797h2.443l4.79 12.797h-2.804zm-3.911-2.136h3.199l-1.609-4.79zm11.434 2.655h5.599v2.118h-8.236V5.676h2.637zm8.675-3.094v5.212h-1.081V5.676h4.359q1.995 0 3.147 1.02 1.16 1.019 1.16 2.803 0 1.802-1.116 2.786-1.108.975-3.217.976zm0-.914h3.278q1.573 0 2.4-.747.826-.748.826-2.083 0-1.327-.826-2.11-.818-.791-2.329-.808h-3.349zm14.792.8h-3.718v5.326h-1.09V5.676h4.157q2.048 0 3.2.993 1.15.993 1.151 2.777 0 1.23-.721 2.171-.72.94-1.933 1.301l3.199 5.44v.115h-1.152zm-3.718-.923h3.313q1.363 0 2.189-.774.826-.773.826-2.004 0-1.353-.861-2.1t-2.417-.747h-3.05zm19.819.545q0 1.765-.615 3.102-.606 1.335-1.74 2.057-1.134.72-2.619.72-2.241 0-3.621-1.6-1.38-1.607-1.38-4.332v-1.318q0-1.75.615-3.094.624-1.354 1.758-2.075 1.134-.729 2.61-.729 1.477 0 2.602.712 1.134.712 1.749 2.013t.641 3.014zm-1.081-1.39q0-2.31-1.046-3.62t-2.865-1.31q-1.784 0-2.848 1.319-1.054 1.309-1.054 3.665v1.336q0 2.275 1.054 3.612 1.056 1.327 2.866 1.327 1.836 0 2.865-1.31 1.028-1.317 1.028-3.665z'></path>
            <g fill='#fff' clip-path='url(#light-logo_svg__a)'>
              <path d='M0 2.725c0 2.35.8 3.5 4 5.6 3.55 2.35 4 3.1 4 6.6 0 4.9 1.5 7.8 4.05 7.8 1.75 0 1.95-.7 1.95-7.75l-.05-7.75-6.4-3.75c-7.7-4.5-7.55-4.5-7.55-.75M22.25 3.525l-6.2 3.7-.05 7.75c0 7.05.2 7.75 1.95 7.75 2.55 0 4.05-2.9 4.05-7.8 0-3.5.45-4.25 4-6.6 3.2-2.1 4-3.25 4-5.6 0-3.75-.15-3.7-7.75.8'></path>
            </g>
            <defs>
              <clipPath id='light-logo_svg__a'>
                <path fill='#fff' d='M0 0h30v23H0z'></path>
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <div className='header__menu--left'>
        <button className='header__bars'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            width='20'
            height='20'
            viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M3.25 7A.75.75 0 0 1 4 6.25h16a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 7m0 5a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75m0 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75'
              clipRule='evenodd'></path>
          </svg>
        </button>
        <button className='header__search'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            width='20'
            height='20'
            viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' strokeWidth='1.5'>
              <circle cx='11.5' cy='11.5' r='9.5'></circle>
              <path strokeLinecap='round' d='M18.5 18.5L22 22'></path>
            </g>
          </svg>
        </button>

        <button className='header__search'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            width='20'
            height='20'
            viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' strokeWidth='1.5'>
              <path
                d='M2.5 6.5a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm11 11a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z'
                opacity='.5'></path>
              <path d='M21.5 6.5a4 4 0 1 0-8 0a4 4 0 0 0 8 0Zm-11 11a4 4 0 1 0-8 0a4 4 0 0 0 8 0Z'></path>
            </g>
          </svg>
        </button>
      </div>
      <div className='header__menu--right'></div>
    </header>
    // <div style={{ textAlign: "center", marginTop: "50px" }}>
    //   <h1>Dashboard</h1>
    //   <p>Selamat datang di halaman dashboard!</p>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
  );
};

export default Dashboard;
