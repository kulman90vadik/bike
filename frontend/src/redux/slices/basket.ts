import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { BasketProps } from '../../propstype';
import { RootState } from '../store';

export const fetchBasket = createAsyncThunk<BasketProps[], string, { state: RootState }>(
    'auth/fetchBasket', async (id: string, { getState }) => {
       const state = getState(); 
       const isAuth = Boolean(state.auth.data); 
    if (isAuth) {
        const { data } = await axios.post<BasketProps[]>(`./basket/${id}`);
        return data;
    } else {
        const products = state.products.data; 


        console.log(products, 'products')
        console.log(id, 'id')




        const product = products.find((p) => p._id === id);
        if (!product) return []; 
        let basketStorage = JSON.parse(localStorage.getItem('basket') || '[]');
        const productIndex = basketStorage.findIndex((item: BasketProps) => item.productId  === id);
        if (productIndex !== -1) {
          basketStorage.splice(productIndex, 1); 
        } else {


           basketStorage.push({
                productId: product._id,   // <-- добавляем productId
                ...product,
                basePrice: Number(product.price)
            });


        }
        localStorage.setItem('basket', JSON.stringify(basketStorage));
        return basketStorage; 
      }
    }
  );



export const fetchCounterBasketCard = createAsyncThunk<BasketProps[], { id: string; str: string }>(
  'auth/fetchCounterBasketCard', async ({ id, str }, { getState }) => { 
    const state = getState() as any; 
    const isAuth = Boolean(state.auth?.data);

    if (isAuth) {
      const { data } = await axios.post<BasketProps[]>(`./basket/counter/${id}/${str}`);
      return data;
    }
    else {
        let basketStorage = JSON.parse(localStorage.getItem('basket') || '[]');
         basketStorage.map((item: BasketProps) => {
            if(item._id === id) {

                if (str === 'plus') {
                    item.counter += 1;
                    item.price = String(Number(item.basePrice) + Number(item.price));
                }
                else if (str === 'minus' && item.counter > 0) {
                    item.counter -= 1;
                    item.price = String(Number(item.price) - Number(item.basePrice));
                }
            }
         });
        localStorage.setItem('basket', JSON.stringify(basketStorage));

        // Возвращаем обновлённый массив
        return basketStorage;
    }

    return []; // Возвращаем пустой массив, если пользователь не авторизован
  }
);


export const fetchAllBasket =  createAsyncThunk<BasketProps[], void, { state: RootState }>(
    'auth/fetchAllBasket', async(_, { getState }) => {
    const state = getState(); // Берем текущее состояние Redux
    const isAuth = Boolean(state.auth.data); // Проверяем авторизацию
    if(isAuth) {
        const {data} = await axios.get<BasketProps[]>('./basket');
        return data;
    }
    else {
        let basketStorage = JSON.parse(localStorage.getItem('basket') || '[]');
        return basketStorage;
    }
})


type Props = {
    data: BasketProps[],
    status: string,
   
    statusId: {
        [key: string]: 'loading' | 'loaded' | 'error' | undefined;
    }
}


const initialState: Props = {
    data: [],
    status: 'loading',
    statusId: {},
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
        builder.addCase(fetchBasket.pending, (state, action) => {
            // state.data = [];
            const itemId = action.meta.arg;
            state.statusId[itemId] = 'loading'
        });
        builder.addCase(fetchBasket.fulfilled, (state, action) => {
            const itemId = action.meta.arg;
            state.statusId[itemId] = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchBasket.rejected, (state, action) => {
            const itemId = action.meta.arg;
            state.statusId[itemId] = 'error';
            state.data = [];
        });
//
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
//
        builder.addCase(fetchCounterBasketCard.pending, (state) => {
            state.status = 'loading'
            // state.data = [];
        });
        builder.addCase(fetchCounterBasketCard.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchCounterBasketCard.rejected, (state) => {
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

