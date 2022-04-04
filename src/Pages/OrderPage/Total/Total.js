import React from 'react';
import Moment from 'react-moment';
import classes from './Total.module.css';

const Total = ({ currentCar, extra, sinceDate, endDate }) => {
  const numberHandler = () => {
    const number = `${currentCar.number.substr(
      0,
      1
    )} ${currentCar.number.substr(1, 3)} ${currentCar.number.substr(
      -4,
      2
    )} ${currentCar.number.substr(-2, 2)}`;

    return number;
  };

  return (
    currentCar && (
      <div className={classes.total_form}>
        <div className={classes.order_inf}>
          <div className={classes.car_name}>{currentCar.name}</div>
          <div className={classes.car_numbers}>{numberHandler()}</div>
          <div className={classes.item_information}>
            <label className={classes.item_label}>Топливо</label>
            <div className={classes.item_value}>
              &nbsp; {extra.isFullTank === true ? '100%' : '50%'}
            </div>
          </div>
          <div className={classes.item_information}>
            <label className={classes.item_label}>Доступна с&nbsp;</label>
            <Moment className={classes.item_value} format={'DD.MM.Y HH:mm'}>
              {sinceDate}
            </Moment>
          </div>
          <div className={classes.item_information}>
            <label className={classes.item_label}>Доступна по&nbsp;</label>
            <Moment className={classes.item_value} format={'DD.MM.Y HH:mm'}>
              {endDate}
            </Moment>
          </div>
        </div>
        <div
          className={classes.car_form}
          style={{
            background: `url(${currentCar.thumbnail.path}) no-repeat 85% 95%`,
            backgroundSize: '80%',
          }}
        />
      </div>
    )
  );
};

export default Total;
