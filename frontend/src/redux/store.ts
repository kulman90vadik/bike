
import {configureStore} from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { useDispatch } from 'react-redux'
import { productsReducer } from './slices/products';
import { topProductsReducer } from './slices/topproducts';
import { basketReducer } from './slices/basket';
import { favoritesReducer } from './slices/favorites';
import { searchReducer } from './slices/search';
// import {postsReducer} from './slices/posts'



const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        basket: basketReducer,
        favorites: favoritesReducer,
        search: searchReducer,
        topproducts: topProductsReducer
    }
})

export default store;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


