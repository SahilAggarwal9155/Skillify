import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import userReducer from "../features/user/pages/userProfileSlice";

// Persist configuration for the user reducer
const persistConfig = {
  key: "root", // Key to store the persisted data
  storage, // Default localStorage
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Use persisted user reducer
  },
});

export const persistor = persistStore(store); // Persistor to be used in PersistGate
