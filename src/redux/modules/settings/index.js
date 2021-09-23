import { combineReducers } from "redux";

import cities from "./cities/reducer";
import districts from "./districts/reducer";
import countries from "./countries/reducer";
import ui from "./ui/reducer";

export default combineReducers({
    cities,
    districts,
    countries,
    ui
});