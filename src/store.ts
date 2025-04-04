import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "./lib/prompt/promptSlice";

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
