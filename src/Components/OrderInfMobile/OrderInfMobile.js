import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import exit from '../../assets/exit.svg';
import classes from './OrderInfMobile.module.css';

const OrderInfMobile = ({
  setIsMobileOpened, infMobileOpened, currentCar, infArr, isButtonDisabled, buttonHandler, linkHandler,
}) => {
  const closeMenuHandler = () => {
    setIsMobileOpened(false);
  };

  return (
         <div className={infMobileOpened ? classes.order_inf_form_mobile : classes.order_inf_form_mobile_closed}>
            <div className={classes.menu_form}>
                <ReactSVG className={classes.exit_btn} src={exit} onClick={closeMenuHandler}/>
                <div className={classes.order_inf_form}>
                    <div className={classes.order_inf_header}>
                        Ваш заказ:
                    </div>
                    <div className={classes.all_order_inf}>
                    {infArr
                      && infArr.map((item, index) => (
                          <div className={item.item ? classes.order_inf : classes.order_inf_hidden } key={index}>
                            <div className={classes.inf_name}>
                                {item.header}
                            </div>
                            <div className={classes.dots_style}>
                            </div>
                            <div className={classes.inf_value}>
                                {item.value}
                            </div>
                          </div>
                      ))
                    }
                    {currentCar
                      && <div className={classes.order_price_inf}>
                          <div className={classes.order_price_header}>
                              Цена:
                          </div>
                          <div className={classes.order_price}>
                              от {currentCar.priceMin} до {currentCar.priceMax} ₽
                          </div>
                        </div>
                      }
                        <button
                            disabled={isButtonDisabled}
                            className={classNames({
                              [classes.order_inf_btn]: true,
                              [classes.order_inf_btn_active]: !isButtonDisabled,
                              [classes.order_inf_btn_disabled]: isButtonDisabled,
                            })}
                            onClick={linkHandler}
                        >
                            {buttonHandler()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default OrderInfMobile;
