import { configureStore } from "@reduxjs/toolkit";
import cocktailReducer from "./cocktailSlice";

export const store = configureStore({
  reducer: {
    cocktail: cocktailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
