import {createSlice} from '@reduxjs/toolkit';
const initialState = <any>{};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, {payload}) => {
      return payload;
    },
    clearAuth: () => {
      return {};
    },
  },
});

const {reducer, actions} = authSlice;
export const {setAuth, clearAuth} = actions;
export default reducer;
