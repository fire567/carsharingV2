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

export const getCurrentCar = (state) => state.currentCar;
export const getRates = (state) => state.rates;
export const getExtra = (state) => state.extra;
export const getDate = (state) => state.date;
export const getCurrentRate = (state) => state.currentRate;
export const getColor = (state) => state.color;

export const appReducer = combineReducers({
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

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
