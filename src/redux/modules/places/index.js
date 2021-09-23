import { combineReducers } from "redux";
import list from "./list";
import edit from "./edit";
import add from "./add";

export default combineReducers({
  list,
  edit,
  add
});