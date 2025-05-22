import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import postReducer from "./features/PostSlice";
import imageUploadReducer from "./features/UploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    upload: imageUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
