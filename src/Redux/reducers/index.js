import { combineReducers } from 'redux';
import cities from './cities';
import point from './point';
import location from './location';
import categories from './categories';
import cars from './cars';
import currentCar from './currentCar';
import rates from './rates';
import color from './color';
import currentRate from './currentRate';
import extra from './extra';
import date from './date';
import currentPrice from './currentPrice';
import postedOrder from './postedOrder';
import order from './order';

export default combineReducers({
  color: color,
  cities: cities,
  point: point,
  location: location,
  categories: categories,
  cars: cars,
  currentCar: currentCar,
  rates: rates,
  currentRate: currentRate,
  extra: extra,
  date: date,
  currentPrice: currentPrice,
  postedOrder: postedOrder,
  order: order,
});
