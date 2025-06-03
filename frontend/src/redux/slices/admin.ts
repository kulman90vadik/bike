import { createSlice } from '@reduxjs/toolkit';

type Props = {
    route: string
}

const initialState: Props = {
    route: 'adminProducts'
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        routeHandler: (state, action) => {
            state.route = action.payload;
        },
    }
})
// 

// export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.data);
// // export const userData = (state: RootState) => state.auth.data;
// export const userData = (state: RootState): string => String(state.auth.data?.fullName);
// export const dataAuth = (state: RootState) => state.auth.data;
export const { routeHandler } = adminSlice.actions;
export const routeReducer = adminSlice.reducer;

