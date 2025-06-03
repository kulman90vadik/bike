import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FormValueslogin, FormValuesRegister, Registerprops, UsersProps } from '../../propstype';
import axios from '../../axios';
import { RootState } from '../store';

export const fetchAuth = createAsyncThunk<Registerprops, FormValueslogin>('auth/fetchUserData', async(params:FormValueslogin) => {
    const {data} = await axios.post<Registerprops>('./auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk<Registerprops, FormValuesRegister>('auth/fetchRegister', async(params: FormValuesRegister) => {
    const {data} = await axios.post<Registerprops>('./auth/register', params);
    return data;

})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async() => {
    const {data} = await axios.get('./auth/me');
    return data;
})


export const fetchAuthUsers = createAsyncThunk('auth/fetchAuthUsers', async() => {
    const {data} = await axios.get<UsersProps[]>('./auth/users');
    return data;
})



interface Props {
    status: string,
    data: Registerprops | null
    users: UsersProps[] 
}

const initialState: Props = {
    data: null,
    users: [],
    status: 'loading'
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },


    extraReducers: (builder) => {


// fetchAuth

        builder.addCase(fetchAuth.pending, (state) => {
            state.status = 'loading'
            state.data = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.status = 'error'
            state.data = null;
        });

// fetchAuthMe

        builder.addCase(fetchAuthMe.pending, (state) => {
            state.status = 'loading'
            state.data = null;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.status = 'error'
            state.data = null;
        });

// fetchRegister

        builder.addCase(fetchRegister.pending, (state) => {
            state.status = 'loading'
            state.data = null;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.data = action.payload;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.status = 'error'
            state.data = null;
        });

// fetchAuthUsers

        builder.addCase(fetchAuthUsers.pending, (state) => {
            state.status = 'loading'
            state.users = [];
        });
        builder.addCase(fetchAuthUsers.fulfilled, (state, action) => {
            state.status = 'loaded'
            state.users = action.payload;
        });
        builder.addCase(fetchAuthUsers.rejected, (state) => {
            state.status = 'error'
            state.users = [];
        });
    }

})


export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// export const userData = (state: RootState) => state.auth.data;
export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const dataAuth = (state: RootState) => state.auth.data;
export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;

