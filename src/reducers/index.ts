import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import appStatus from "./appStatus";

export const rootReducer = combineReducers({
  user,
  appStatus,
});
