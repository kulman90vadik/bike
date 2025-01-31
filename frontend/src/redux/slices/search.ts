import { createSlice } from '@reduxjs/toolkit';

type Props = {
    search: string
}

const initialState: Props = {
    search: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchValue: (state, action) => {
            state.search = action.payload;
        },
        searchValueClear: (state) => {
            state.search = '';
        }
    }
})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const dataAuth = (state: RootState) => state.auth.data;
export const { searchValue, searchValueClear } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

