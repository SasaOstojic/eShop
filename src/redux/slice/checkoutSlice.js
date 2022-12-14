import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    billingAddress: {},
    shippingAddress: {}
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action){
        console.log(action.payload)
        state.shippingAddress = action.payload
    },
    SAVE_BILLING_ADDRESS(state, action){
        console.log(action.payload)
        state.shippingAddress = action.payload
    }
  }
});

export const {SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS} = checkoutSlice.actions
export const selectShippingAdress = (state) => state.checkout.shippingAddress
export const selectBillingAdress = (state) => state.checkout.billingAddress

export default checkoutSlice.reducer