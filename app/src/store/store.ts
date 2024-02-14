import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import moduleWindowSlice from "./slices/moduleWindowSlice";


export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth : authSlice,
    moduleWindow : moduleWindowSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch