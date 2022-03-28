import React from 'react';
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
      className={currentCar && currentCar.id === car.id ? classes.car_form_active : classes.car_form }
      style={{ background: `url(${car.thumbnail.path}) no-repeat 85% 97%`, backgroundSize: '70%' }}
      onClick={carPickHandler}>
      <div className={classes.model_name}>{car.name}</div>
      <div className={classes.price}>{car.priceMin} - {car.priceMax} ₽</div>
    </div>
  );
};

export default CarsList;
