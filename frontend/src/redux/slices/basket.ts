import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { FormValueslogin, FormValuesRegister, Registerprops } from '../../propstype';
import axios from '../../axios';
import { BasketProps } from '../../propstype';
// import { ProductProps } from '../../propstype';
// import { RootState } from '../store';

export const fetchBasket = createAsyncThunk<BasketProps[], string>('auth/fetchBasket', async(id: string) => {
    const {data} = await axios.post<BasketProps[]>(`./basket/${id}`);
    return data;
})

export const fetchAllBasket = createAsyncThunk('auth/fetchAllBasket', async() => {
    const {data} = await axios.get<BasketProps[]>('./basket');
    return data;
})


type Props = {
    data: BasketProps[],
    status: string
}


const initialState: Props = {
    data: [],
    status: 'loading'
}



const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.data = null;
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchBasket.pending, (state) => {
            state.status = 'loading'
            state.data = [];
        });
        builder.addCase(fetchBasket.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchBasket.rejected, (state) => {
            state.status = 'error'
            state.data = [];
        });

        ////

        builder.addCase(fetchAllBasket.pending, (state) => {
            state.status = 'loading'
            state.data = [];
        });
        builder.addCase(fetchAllBasket.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchAllBasket.rejected, (state) => {
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
export const basketReducer = basketSlice.reducer;

