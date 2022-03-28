import { combineReducers } from 'redux';
import cities from './cities';
import point from './point';
import location from './location';

export default combineReducers({
  cities,
  point,
  location,
});
