import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isAxiosError  } from 'axios';
import axios from '../../axios';
import { ProductProps } from '../../propstype';
import { RootState } from '../store';
// import { RootState } from '../store';

export const fetchFavorites = createAsyncThunk<ProductProps[], string, { state: RootState }>(
    'auth/fetchFavorites', async(id: string, { getState }) => {
        const state = getState(); 
        const isAuth = Boolean(state.auth.data); 
        if (isAuth) {
            const {data} = await axios.post<ProductProps[]>(`./favorites/${id}`);
            return data;
        }
        else {
            const products = state.products.data; 
            const product = products.find((p) => p._id === id);
            if (!product) return []; 
            let favoritesStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
            const productIndex = favoritesStorage.findIndex((item: ProductProps) => item.productId === id);
            if (productIndex !== -1) {favoritesStorage.splice(productIndex, 1); 
            } else {

                
           favoritesStorage.push({
                productId: product._id,   // <-- добавляем productId
                ...product,
                basePrice: Number(product.price)
            });
                
                // favoritesStorage.push({...product, basePrice: Number(product.price)});
        
            }
            localStorage.setItem('favorites', JSON.stringify(favoritesStorage));
            return favoritesStorage; 
        }
})



export const fetchAllFavorites = createAsyncThunk<ProductProps[], void, { state: RootState; rejectValue: string }>(
    'auth/fetchAllFavorites', async(_, { getState, rejectWithValue  }) => {
        const state = getState(); // Берем текущее состояние Redux
        const isAuth = Boolean(state.auth.data); // Проверяем авторизацию

        try {     
            if(isAuth) {
                const {data} = await axios.get<ProductProps[]>('./favorites');
                return data;
            }
            else {
                let favoritesStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
                return favoritesStorage;
            }
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 429) {
                return rejectWithValue('Too many requests. Please try again later');
            }
            return rejectWithValue('Ошибка загрузки избранного');
        }
})




type Props = {
    data: ProductProps[],
    status: string,
    errorMessage: string | null;
}


const initialState: Props = {
    data: [],
    status: 'loading',
    errorMessage: null,
}



const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.data = null;
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.status = 'loading'
            // state.data = [];
        });
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchFavorites.rejected, (state) => {
            state.status = 'error'
            state.data = [];
        });


        builder.addCase(fetchAllFavorites.pending, (state) => {
            state.status = 'loading'
            state.data = [];
        });
        builder.addCase(fetchAllFavorites.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchAllFavorites.rejected, (state, action) => {
            state.status = 'error'
            state.data = [];
              if (action.payload) {
                    state.errorMessage = action.payload;
                } else {
                    state.errorMessage = 'Неизвестная ошибка';
                }
        });
   
    }

})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const dataAuth = (state: RootState) => state.auth.data;
export const favoritesReducer = favoritesSlice.reducer;

