import React from 'react';
import classes from './CarsList.module.css';

const CarsList = ({ car }) => (
    <div className={classes.car_form} style={{ background: `url(${car.thumbnail.path}) no-repeat 85% 97%`, backgroundSize: '70%' }}>
        <div className={classes.model_name}>{car.name}</div>
        <div className={classes.price}>{car.priceMin} - {car.priceMax} ₽</div>
    </div>
);

export default CarsList;
