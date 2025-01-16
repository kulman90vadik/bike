import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { FormValueslogin, FormValuesRegister, Registerprops } from '../../propstype';
import axios from '../../axios';
import { ProductProps } from '../../propstype';
// import { RootState } from '../store';

export const fetchProducts = createAsyncThunk<ProductProps[]>('auth/fetchProducts', async() => {
    const {data} = await axios.get<ProductProps[]>('./products');
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



const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.data = null;
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
            state.data = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
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
export const productsReducer = productsSlice.reducer;

