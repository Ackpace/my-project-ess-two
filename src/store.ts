import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/myMovies/counterSlice'
import favoritesReducer from './reducers/myMovies/favoritesSlice'
 
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        favorites: favoritesReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch 