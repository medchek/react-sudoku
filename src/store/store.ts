import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./slices/gridSlice";
import timerReducer from "./slices/timerSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    timer: timerReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
