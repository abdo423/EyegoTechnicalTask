import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Reducers/sideBarSlice"; // Import sidebar slice
import productsSlice from "./Reducers/productsSlice";
import authSlice from "./Reducers/authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, 
    products: productsSlice, // Add productsSlice reducer
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
