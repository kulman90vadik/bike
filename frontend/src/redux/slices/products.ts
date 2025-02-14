import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ProductProps } from '../../propstype';
import { RootState } from '../store';


export const fetchProducts = createAsyncThunk<ProductProps[]>('auth/fetchProducts', async() => {
    const {data} = await axios.get<ProductProps[]>('./products');
    return data;
})

export const fetchSortProducts = createAsyncThunk<ProductProps[], string, { rejectValue: string }>(
    'auth/fetchSortProducts', async(queryString)=> {
console.log(`./products/sort?${queryString}`)
    const {data} = await axios.get<ProductProps[]>(`./products/sort?${queryString}`);
    return data;
})


type Props = {
    data: ProductProps[],
    status: string,
    sales: string,
    branding: string,
    country: string,
    sortOrder: string
}

const initialState: Props = {
    data: [],
    sortOrder: '',
    sales: '',
    branding: '',
    country: '',
    status: 'loading'
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setSale: (state, action) => {
            state.sales = action.payload;
        },
        setBranding: (state, action) => {
            state.branding = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
            state.data = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = 'error';
            state.data = [];
        });

        builder.addCase(fetchSortProducts.pending, (state) => {
            state.status = 'loading';
            state.data = [];
        });
        builder.addCase(fetchSortProducts.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchSortProducts.rejected, (state) => {
            state.status = 'error';
            state.data = [];
        });
    }
})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
export const branding = (state: RootState) => state.products.branding;
export const { setSortOrder, setCountry, setSale, setBranding } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

