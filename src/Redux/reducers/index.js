import { combineReducers } from "redux";
import language from "./language";
import isMenuOpened from "./isMenuOpened";

export default combineReducers({
    language: language,
    isMenuOpened: isMenuOpened,
})