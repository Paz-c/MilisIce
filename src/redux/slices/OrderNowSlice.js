import {createSlice} from '@reduxjs/toolkit';
import vanilla from '../../assets/vanilla.jpg';
import strawberry from '../../assets/strawberry.png';
import strawberry1 from '../../assets/strawberry1.png';
import vanillaflavor from '../../assets/vanillaflavor.png';

const initialState = {
  name: '',
  order: null
};

export const OrderNowSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const {} = OrderNowSlice.actions;

export default OrderNowSlice.reducer;
