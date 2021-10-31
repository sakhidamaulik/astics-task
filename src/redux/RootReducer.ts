import { combineReducers } from "redux";
import { productsDashboardReducer } from "./ProductsDashboard.Reducer";

export const rootReducer = combineReducers({
  productsDashboardState: productsDashboardReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
