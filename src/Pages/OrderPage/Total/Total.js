import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Total.module.css';

const Total = () => {
  const currentCar = useSelector((state) => state.currentCar);

  return (
    <div className={classes.total_form}>
      <div className={classes.order_inf}>
        <div className={classes.car_name}>{currentCar.name}</div>
        <div className={classes.car_numbers}>{currentCar.number}</div>
        <div className={classes.item_information}>
          <label className={classes.item_label}>asd</label>
          <div className={classes.item_value}>qwe</div>
        </div>
        <div className={classes.item_information}>
          <label className={classes.item_label}>zxc</label>
          <div className={classes.item_value}>qqwes</div>
        </div>
      </div>
    </div>
  );
};

export default Total;
