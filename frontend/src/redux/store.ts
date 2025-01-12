
import {configureStore} from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { useDispatch } from 'react-redux'
// import {postsReducer} from './slices/posts'



const store = configureStore({
    reducer: {
        // posts: postsReducer,
        auth: authReducer
    }
})

export default store;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


