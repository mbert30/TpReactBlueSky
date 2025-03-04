import { configureStore } from '@reduxjs/toolkit';
import tweetReducer from '../domains/tweets/tweetSlice';
import authReducer from '../domains/auth/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"

const store = configureStore({
  reducer: {
    tweets: tweetReducer,
    auth: authReducer,
  }
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

export default store;
