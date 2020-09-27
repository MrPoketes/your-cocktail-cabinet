import { combineReducers } from "redux";
import cocktailReducer from "./cocktailReducer";
import userReducer from "./userReducer";

export default combineReducers({
    cocktails: cocktailReducer,
    user: userReducer
});