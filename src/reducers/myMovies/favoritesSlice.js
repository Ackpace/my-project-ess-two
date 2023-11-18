import {createSlice} from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        movies: []
    }, 
    reducers: {
        INITIALIZE: (state, action) => {
            state.movies = action.payload || []
        },
        ADD_A_FAV_MOVIE: (state, action) => {
            let alreadySelected = false
            if (!state.movies.length) {
                state.movies.push(action.payload)
            } else {
                state.movies.forEach((movie) => {
                    if (movie.id === action.payload.id) {
                        alreadySelected = true
                        return
                    }
                })
                if (!alreadySelected) {
                    state.movies = [...state.movies, action.payload]
                }
            }
        },
        DELETE_A_FAV_MOVIE: (state, action) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload.id)
        }
    }
})

export const {ADD_A_FAV_MOVIE, DELETE_A_FAV_MOVIE, INITIALIZE} = favoritesSlice.actions

export default favoritesSlice.reducer