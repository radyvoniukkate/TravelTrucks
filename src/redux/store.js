import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./truck/slice.js";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

// Налаштування персистенції
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["campers"], // Вкажіть ті редюсери, які потрібно зберігати
};

const rootReducer = combineReducers({
  campers: campersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Створення Store з персистенцією
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export const persistor = persistStore(store);

