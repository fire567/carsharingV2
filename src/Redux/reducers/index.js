import { combineReducers } from "redux";
import cities from "./cities";
import point from "./point";
import location from "./location";
import categories from "./categories";
import cars from "./cars";

export default combineReducers({
    cities: cities,
    point: point,
    location: location,
    categories: categories,
    cars: cars,
})