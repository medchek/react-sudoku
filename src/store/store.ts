import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./slices/gridSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
