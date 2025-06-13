import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ProductProps } from '../../propstype';
// import { RootState } from '../store';


export const fetchTopProducts = createAsyncThunk<ProductProps[]>('auth/fetchTopProducts', async() => {
    const {data} = await axios.get<ProductProps[]>('./products/topproducts');
    return data;
})




type Props = {
    data: ProductProps[],
    status: string,
}

const initialState: Props = {
    data: [],
    status: 'loading'
}


const topProductsSlice = createSlice({
    name: 'topproducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTopProducts.pending, (state) => {
            state.status = 'loading';
            state.data = [];
        });
        builder.addCase(fetchTopProducts.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchTopProducts.rejected, (state) => {
            state.status = 'error';
            state.data = [];
        });
    }
})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const branding = (state: RootState) => state.products.branding;
// export const { setSortOrder, setRangePrice, setCountry, setSale, setBranding } = productsSlice.actions;
export const topProductsReducer = topProductsSlice.reducer;

