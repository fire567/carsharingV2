import { combineReducers } from "redux";
import language from "./language";
import isMenuOpened from "./isMenuOpened";
import cities from "./cities";
import point from "./point";

export default combineReducers({
    language: language,
    isMenuOpened: isMenuOpened,
    cities: cities,
    point: point,
})