import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';
import { ProductProps } from '../../propstype';
// import { RootState } from '../store';

export const fetchFavorites = createAsyncThunk<ProductProps[], string>('auth/fetchFavorites', async(id: string) => {
    const {data} = await axios.post<ProductProps[]>(`./favorites/${id}`);
    return data;
})

export const fetchAllFavorites = createAsyncThunk('auth/fetchAllFavorites', async() => {
    const {data} = await axios.get<ProductProps[]>('./favorites');
    return data;
})


type Props = {
    data: ProductProps[],
    status: string
}


const initialState: Props = {
    data: [],
    status: 'loading'
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
        builder.addCase(fetchAllFavorites.rejected, (state) => {
            state.status = 'error'
            state.data = [];
        });
   
    }

})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const dataAuth = (state: RootState) => state.auth.data;
export const favoritesReducer = favoritesSlice.reducer;

