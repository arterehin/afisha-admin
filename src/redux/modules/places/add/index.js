import { combineReducers } from "redux";
import attributes from "./attributes";
import fields from "./fields";

export default combineReducers({
  attributes,
  fields
});