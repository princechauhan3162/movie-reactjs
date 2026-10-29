import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import movieReducer from "./reducer.js";

const store = createStore(movieReducer, applyMiddleware(thunk));

export default store;
