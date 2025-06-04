import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { PaginatedResponse, ProductProps } from '../../propstype';
import { RootState } from '../store';


interface FetchParams {
  page?: number;
  limit?: number;
}

export const fetchProductsPag = createAsyncThunk<PaginatedResponse, FetchParams | undefined>(
  'auth/fetchProductsPag',
  async (params = {}) => {
    const { page = 1, limit = 6} = params;
    const { data } = await axios.get<PaginatedResponse>(`/productspag?page=${page}&limit=${limit}`);
    return data;
  }
);

export const fetchProducts = createAsyncThunk<ProductProps[]>('auth/fetchProducts', async() => {
    const {data} = await axios.get<ProductProps[]>('./products');
    return data;
})

// export const fetchSortProducts = createAsyncThunk<ProductProps[], string, { rejectValue: string }>(
//     'auth/fetchSortProducts', async(queryString)=> {
//     const {data} = await axios.get<ProductProps[]>(`./products/sort?${queryString}`);
//     return data;
// })

export const fetchSortProducts = createAsyncThunk<PaginatedResponse, string, { rejectValue: string }>(
  'auth/fetchSortProducts',
  async (queryString) => {
    const { data } = await axios.get<PaginatedResponse>(`./products/sort?${queryString}`);
    return data;
  }
);


type Props = {
    data: ProductProps[],
    allproducts: ProductProps[],
    status: string,
    sales: string,
    branding: string,
    country: string,
    sortOrder: string,
    preisRange: string,
    statusAll: string,

    limit: number,
    page: number,
    totalPages: number,
    totalItems: number,

    price: number
}

const initialState: Props = {
    data: [],
    allproducts: [],
    sortOrder: '',
    sales: '',
    branding: '',
    country: '',
    preisRange: '',
    statusAll: 'loading',
    status: 'loading',

    limit: 3,
    page: 1,
    totalPages: 0,
    totalItems: 0,


    price: 0
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
        },

        // setRangePrice: (state, action) => {
        //     state.preisRange = action.payload;
        // },

        setPrice: (state, action) => {
            state.price = action.payload
        }
    },
    extraReducers: (builder) => {



// fetchProducts        

        builder.addCase(fetchProducts.pending, (state) => {
            state.statusAll = 'loading';
            // state.data = [];
            state.allproducts = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.statusAll = 'loaded';
            // state.data = action.payload;
            state.allproducts = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.statusAll = 'error';
            // state.data = [];
            state.allproducts = [];
        });




//fetchProductsPag

        builder.addCase(fetchProductsPag.pending, (state) => {
            state.status = 'loading';
            state.data = [];
        });

        builder.addCase(fetchProductsPag.fulfilled, (state, action) => {
            state.status = 'loaded';

            state.data = action.payload.products;
            state.totalItems = action.payload.totalItems
            state.totalPages = action.payload.totalPages
            state.page = action.payload.page
            state.limit = action.payload.limit
        });

        builder.addCase(fetchProductsPag.rejected, (state) => {
            state.status = 'error';
            state.data = [];
        });

// fetchSortProducts

        builder.addCase(fetchSortProducts.pending, (state) => {
            state.status = 'loading';
            state.data = [];
        });
        builder.addCase(fetchSortProducts.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload.products;


            state.totalItems = action.payload.totalItems
            state.totalPages = action.payload.totalPages
            state.page = action.payload.page
            state.limit = action.payload.limit

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
export const { setSortOrder, setCountry, setSale, setBranding, setPrice } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

