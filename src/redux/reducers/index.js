import { combineReducers } from "redux";
import { globalReducer } from "./global";
export const rootReducer = combineReducers({
  global: globalReducer,
});
