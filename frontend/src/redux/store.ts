
import {configureStore} from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { useDispatch } from 'react-redux'
import { productsReducer } from './slices/products';
import { basketReducer } from './slices/basket';
// import {postsReducer} from './slices/posts'



const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        basket: basketReducer
    }
})

export default store;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


