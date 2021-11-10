import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import orderNowReducer from './slices/OrderNowSlice'

export const store = configureStore({
  reducer: {
      user: userReducer,
      orderNow: orderNowReducer,
  },
})