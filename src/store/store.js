import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./error";
// import {
//   legacy_createStore as createStore,
//   compose,
//   applyMiddleware,
// } from "redux";
import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
// import { taskReducer } from "./task/reducer";
import taskReducer from "./task";

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

// const middlewareEnhancer = applyMiddleware(logger, thunk);
function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

// taskReducer,
// compose(
//   middlewareEnhancer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default createStore;
