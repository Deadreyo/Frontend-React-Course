import { createStore, combineReducers, applyMiddleware } from "redux"
import { Comments } from "./comments";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import thunk from 'redux-thunk';
import logger from "redux-logger";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            comments: Comments,
            dishes: Dishes,
            leaders: Leaders,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)
    )
    
    return store;
}