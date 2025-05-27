import { JSX } from "react";
import imageNotFound from "../assets/images/errorimg-DMfrvJV_.svg";
import "../styles/pages/_notfound.scss";
const NotFound = (): JSX.Element => (
  <div className='page__notfound'>
    <img className='page__notfound--img' src={imageNotFound} alt='Not Found' />
    <h1>Opps!!!</h1>
    <p>This page you are looking for could not be found.</p>
    <a className='page__notfound--link' href='/' data-discover='true'>
      Go Back to Home<span></span>
    </a>
  </div>
);

export default NotFound;
