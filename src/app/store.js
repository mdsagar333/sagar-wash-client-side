import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import globalReducer from "../globalState/GlobalStateSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    globalState: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
