import { JSX } from "react";
import ButtonTemplate from "../../components/Button";
import "../../styles/pages/_components.scss";
const Button = (): JSX.Element => {
  return (
    <div className='components__container'>
      <div className='border__bottom'>
        <h2>Button</h2>
      </div>
      <div className='grid' style={{ paddingTop: "15px" }}>
        <div className='grid__item grid__item--col-6'>
          <div className='components__content'>
            <h3 className='border__bottom components__header'>Default</h3>
            <ButtonTemplate variant='primary'>Primary</ButtonTemplate>
            <ButtonTemplate variant='secondary'>Secondary</ButtonTemplate>
            <ButtonTemplate disabled>Disabled</ButtonTemplate>
          </div>
        </div>
        <div className='grid__item grid__item--col-6'>
          <div className='components__content'>
            <h3 className='border__bottom components__header'>Colors</h3>
            <ButtonTemplate variant='primary'>Primary</ButtonTemplate>
            <ButtonTemplate variant='secondary'>Secondary</ButtonTemplate>
            <ButtonTemplate variant='danger'>Danger</ButtonTemplate>
            <ButtonTemplate variant='success'>Success</ButtonTemplate>
          </div>
        </div>
      </div>

      <div className='grid' style={{ paddingTop: "15px" }}>
        <div className='grid__item grid__item--col-6'>
          <div>
            <div className='components__content'>
              <h3 className='border__bottom components__header'>Size</h3>
              <ButtonTemplate size='sm'>Small</ButtonTemplate>
              <ButtonTemplate size='md'>Medium</ButtonTemplate>
              <ButtonTemplate size='lg'>Large</ButtonTemplate>
            </div>
          </div>
        </div>
        <div className='grid__item grid__item--col-6'>
          <div className='components__content'>
            <h3 className='border__bottom components__header'>Others</h3>
            <ButtonTemplate icon={<i className='fa-solid fa-user'></i>}>
              With Icon
            </ButtonTemplate>
            <ButtonTemplate loading>Loading...</ButtonTemplate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;
