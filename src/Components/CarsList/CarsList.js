import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCar } from '../../Redux/actions';
import classes from './CarsList.module.css';

const CarsList = ({ car }) => {
  const currentCar = useSelector((state) => state.currentCar);
  const dispatch = useDispatch();

  const carPickHandler = () => {
    dispatch(setCurrentCar(car));
  };

  return (
    <div
      className={classNames(classes.car_form, {
        [classes.car_form_active]: currentCar && currentCar.id === car.id,
      })}
      style={{
        background: `url(${car.thumbnail.path}) no-repeat 85% 95%`,
        backgroundSize: '60%',
      }}
      onClick={carPickHandler}
    >
      <div className={classes.model_name}>{car.name}</div>
      <div className={classes.price}>
        {car.priceMin} - {car.priceMax} ₽
      </div>
    </div>
  );
};

export default CarsList;
