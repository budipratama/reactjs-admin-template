import { JSX } from "react";
import logoProfile from "../assets/images/user-1.jpg";
import "../styles/components/_header.scss";
import { useModal } from "../context/ModalContext";

interface HeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

const Header = ({
  onToggleSidebar,
  sidebarCollapsed,
}: HeaderProps): JSX.Element => {
  const { openModal } = useModal();

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    openModal(<>Konten modal di sini</>, {
      title: "Judul Modal Dinamis",
      position: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
    });
  };

  return (
    <header className='header'>
      <div className={`header__logo ${sidebarCollapsed ? "collapsed" : ""}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='163'
          height='23'
          fill='none'>
          <path
            fill='#fff'
            d='m44.445 5.676 3.287 9.281 3.27-9.281h3.463v12.797h-2.646v-3.498l.264-6.038-3.454 9.536h-1.81l-3.446-9.528.264 6.03v3.498H41V5.676zm19.705 10.16h-4.623l-.879 2.637h-2.803l4.763-12.797h2.444l4.79 12.797h-2.804zM60.24 13.7h3.198L61.83 8.91zm17.375-5.888h-3.92v10.66H71.06V7.813H67.19V5.676h10.424zm9.211 5.115h-5.062v3.428h5.941v2.118h-8.578V5.676h8.56v2.136h-5.923v3.05h5.062zm7.163.861h-2.1v4.685h-2.637V5.676h4.755q2.267 0 3.498 1.01 1.23 1.011 1.23 2.857 0 1.31-.57 2.188-.564.87-1.715 1.39l2.769 5.229v.123h-2.83zm-2.1-2.136h2.127q.993 0 1.538-.5.545-.51.545-1.398 0-.905-.519-1.424-.51-.518-1.573-.518h-2.118zm11.663 6.82h-2.637V5.677h2.637zm9.835-2.636h-4.623l-.879 2.637h-2.804l4.764-12.797h2.443l4.79 12.797h-2.804zm-3.911-2.136h3.199l-1.609-4.79zm11.434 2.655h5.599v2.118h-8.236V5.676h2.637zm8.675-3.094v5.212h-1.081V5.676h4.359q1.995 0 3.147 1.02 1.16 1.019 1.16 2.803 0 1.802-1.116 2.786-1.108.975-3.217.976zm0-.914h3.278q1.573 0 2.4-.747.826-.748.826-2.083 0-1.327-.826-2.11-.818-.791-2.329-.808h-3.349zm14.792.8h-3.718v5.326h-1.09V5.676h4.157q2.048 0 3.2.993 1.15.993 1.151 2.777 0 1.23-.721 2.171-.72.94-1.933 1.301l3.199 5.44v.115h-1.152zm-3.718-.923h3.313q1.363 0 2.189-.774.826-.773.826-2.004 0-1.353-.861-2.1t-2.417-.747h-3.05zm19.819.545q0 1.765-.615 3.102-.606 1.335-1.74 2.057-1.134.72-2.619.72-2.241 0-3.621-1.6-1.38-1.607-1.38-4.332v-1.318q0-1.75.615-3.094.624-1.354 1.758-2.075 1.134-.729 2.61-.729 1.477 0 2.602.712 1.134.712 1.749 2.013t.641 3.014zm-1.081-1.39q0-2.31-1.046-3.62t-2.865-1.31q-1.784 0-2.848 1.319-1.054 1.309-1.054 3.665v1.336q0 2.275 1.054 3.612 1.056 1.327 2.866 1.327 1.836 0 2.865-1.31 1.028-1.317 1.028-3.665z'></path>
          <g fill='#fff' clipPath='url(#light-logo_svg__a)'>
            <path d='M0 2.725c0 2.35.8 3.5 4 5.6 3.55 2.35 4 3.1 4 6.6 0 4.9 1.5 7.8 4.05 7.8 1.75 0 1.95-.7 1.95-7.75l-.05-7.75-6.4-3.75c-7.7-4.5-7.55-4.5-7.55-.75M22.25 3.525l-6.2 3.7-.05 7.75c0 7.05.2 7.75 1.95 7.75 2.55 0 4.05-2.9 4.05-7.8 0-3.5.45-4.25 4-6.6 3.2-2.1 4-3.25 4-5.6 0-3.75-.15-3.7-7.75.8'></path>
          </g>
          <defs>
            <clipPath id='light-logo_svg__a'>
              <path fill='#fff' d='M0 0h30v23H0z'></path>
            </clipPath>
          </defs>
        </svg>
      </div>
      <button className='header__bars' onClick={onToggleSidebar}>
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
      <button className='header__search' onClick={handleClick}>
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
      <button className='header__shortcuts'>
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
      <div className='header__fill--space'></div>
      <button className='header__language'>
        <img
          alt='en'
          className='MuiAvatar-img css-45do71'
          src="data:image/svg+xml,%3csvg%20height='20'%20viewBox='0%200%2028%2020'%20width='28'%20xmlns='http://www.w3.org/2000/svg'%20xmlnsXlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3crect%20id='a'%20height='20'%20rx='3'%20width='28'/%3e%3cmask%20id='b'%20fill='%23fff'%3e%3cuse%20fill='%23fff'%20fill-rule='evenodd'%20xlink:href='%23a'/%3e%3c/mask%3e%3c/defs%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cuse%20fill='%230a17a7'%20xlink:href='%23a'/%3e%3cpath%20d='m29.2824692-1.91644623%201.4911811%202.21076686-9.4483006%206.37223314%206.6746503.0001129v6.66666663l-6.6746503-.0007795%209.4483006%206.3731256-1.4911811%202.2107668-11.9501195-8.0608924.0009836%207.4777795h-6.6666666l-.000317-7.4777795-11.9488189%208.0608924-1.49118107-2.2107668%209.448-6.3731256-6.67434973.0007795v-6.66666663l6.67434973-.0001129-9.448-6.37223314%201.49118107-2.21076686%2011.9488189%208.06.000317-7.4768871h6.6666666l-.0009836%207.4768871z'%20fill='%23fff'%20mask='url(%23b)'/%3e%3cg%20stroke='%23db1f35'%20strokeLinecap='round'%20strokeWidth='.667'%3e%3cpath%20d='m18.668%206.332%2012.665-8.332'%20mask='url(%23b)'/%3e%3cpath%20d='m20.013%2021.35%2011.354-7.652'%20mask='url(%23b)'%20transform='matrix(1%200%200%20-1%200%2035.048)'/%3e%3cpath%20d='m8.006%206.31-11.843-7.981'%20mask='url(%23b)'/%3e%3cpath%20d='m9.29%2022.31-13.127-8.705'%20mask='url(%23b)'%20transform='matrix(1%200%200%20-1%200%2035.915)'/%3e%3c/g%3e%3cpath%20d='m0%2012h12v8h4v-8h12v-4h-12v-8h-4v8h-12z'%20fill='%23e6273e'%20mask='url(%23b)'/%3e%3c/g%3e%3c/svg%3e"></img>
      </button>
      <button className='header__darkmode'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          aria-hidden='true'
          width='20'
          height='20'
          viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75zM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.75 5.75 0 0 1 15.5 14.25v1.5a7.25 7.25 0 0 0 6.21-3.505zM9.75 8.5a5.75 5.75 0 0 1 2.781-4.925l-.776-1.284A7.25 7.25 0 0 0 8.25 8.5zM12 2.75a.38.38 0 0 1-.268-.118a.3.3 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.3.3 0 0 1-.155-.082a.38.38 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606z'></path>
        </svg>
      </button>
      <button className='header__cart'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          aria-hidden='true'
          width='20'
          height='20'
          viewBox='0 0 24 24'>
          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301S6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154s.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z'></path>
            <path
              d='m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4'
              opacity='.5'></path>
            <path d='M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z'></path>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 18L12 9m7.5 9l-7-8.5m-8 .5L12 21l7.5-11'
              opacity='.5'></path>
          </g>
        </svg>
      </button>
      <button className='header__notifications'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          aria-hidden='true'
          width='20'
          height='20'
          viewBox='0 0 24 24'>
          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z'></path>
            <path
              strokeLinecap='round'
              d='M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3M12 6v4'
              opacity='.5'></path>
          </g>
        </svg>
      </button>
      <button className='header__messages'>
        <div className='header__messages__container'>
          <span className='header__messages__container--heartbit'></span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            width='20'
            height='20'
            viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' strokeWidth='1.5'>
              <path d='M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z'></path>
              <path
                strokeLinecap='round'
                d='M2 13h3.16c.905 0 1.358 0 1.756.183s.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214s.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183s.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214S17.934 13 18.84 13H22M8 7h8m-6 3.5h4'
                opacity='.5'></path>
            </g>
          </svg>
          <span className='header__messages__container--alert--blink'></span>
        </div>
      </button>
      <button className='header__profile'>
        <img
          alt='ProfileImg'
          className='header__profile--img'
          src={logoProfile}></img>
      </button>
    </header>
  );
};

export default Header;
