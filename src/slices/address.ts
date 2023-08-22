import {createSlice} from '@reduxjs/toolkit';
const initialState = '';
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, {payload}) => {
      return payload;
    },
    clearAddress: () => {
      return '';
    },
  },
});

const {reducer, actions} = addressSlice;
export const {setAddress, clearAddress} = actions;
export default reducer;
