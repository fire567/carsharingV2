import React from 'react';
import { ReactSVG } from 'react-svg';
import exit from '../../../assets/exit.svg';
import CurrentInf from '../CurrentInf/CurrentInf';
import classes from './OrderInfMobile.module.css';

const OrderInfMobile = ({
  setIsMobileOpened,
  infMobileOpened,
  currentCar,
  infArr,
  currentPrice,
}) => {
  const closeMenuHandler = () => {
    setIsMobileOpened(false);
  };

  return (
    <div
      className={
        infMobileOpened
          ? classes.order_inf_form_mobile
          : classes.order_inf_form_mobile_closed
      }
    >
      <div className={classes.menu_form}>
        <ReactSVG
          className={classes.exit_btn}
          src={exit}
          onClick={closeMenuHandler}
        />
        <div className={classes.order_inf_form}>
          <div className={classes.order_inf_header}>Ваш заказ:</div>
          <CurrentInf
            infArr={infArr}
            currentCar={currentCar}
            currentPrice={currentPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderInfMobile;
