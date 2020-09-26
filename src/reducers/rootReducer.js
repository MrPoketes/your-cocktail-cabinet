import { combineReducers } from "redux";
import cocktailReducer from "./cocktailReducer";

export default combineReducers({
    cocktails: cocktailReducer
});