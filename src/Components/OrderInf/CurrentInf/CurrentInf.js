import React from 'react';
import classes from './CurrentInf.module.css';

const CurrentInf = ({ infArr, currentCar, currentPrice }) => (
  <div className={classes.all_order_inf}>
    {infArr &&
      infArr.map((item, index) => (
        <div
          className={item.value ? classes.order_inf : classes.order_inf_hidden}
          key={index}
        >
          <div className={classes.inf_name}>{item.header}</div>
          <div className={classes.dots_style} />
          <div className={classes.inf_value}>
            {item.value === true ? 'Да' : item.value}
          </div>
        </div>
      ))}
    {currentCar && (
      <div className={classes.order_price_inf}>
        <div className={classes.order_price_header}>Цена:</div>
        <div className={classes.order_price}>
          {currentPrice
            ? `${currentPrice} ₽`
            : `от ${currentCar.priceMin} до ${currentCar.priceMax} ₽`}
        </div>
      </div>
    )}
  </div>
);

export default CurrentInf;
