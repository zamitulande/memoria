import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import testimonyReduce from './features/TestimonySlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        testimony: testimonyReduce
    }
})