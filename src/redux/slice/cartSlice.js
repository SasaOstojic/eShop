import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previuosUrl: ''
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    ADD_TO_CART(state,action){
        console.log(action.payload)
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

        if(productIndex >= 0){
            //Item already exists in the cart
            //Increase cart Quantity
            state.cartItems[productIndex].cartQuantity += 1
            toast.info(`${action.payload.name} Increased quantity by one`, {position: 'top-left'})

        }else {
            //Item doesn't exists in the cart
            //Add item to cart
            const tempProduct = {...action.payload, cartQuantity: 1}
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} Product added to cart`, {position: 'top-left'})

        }
        //Save cart to local storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    DECREASE_CART(state,action){
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

        if(state.cartItems[productIndex].cartQuantity > 1){
            state.cartItems[productIndex].cartQuantity -= 1
            toast.info(`${action.payload.name} Decreased quantity by one`, {position: 'top-left'})
        }else if(state.cartItems[productIndex].cartQuantity === 1){
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.error(`${action.payload.name} Product deleted from cart`, {position: 'top-left'})
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    REMOVE_FROM_CART(state, action){
        const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.success(`${action.payload.name} Product deleted from cart`, {position: 'top-left'})
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    CLEAR_CART(state,action){
        state.cartItems.length = []
        toast.info('Cart has been cleared', {position: 'top-left'})
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    CALCULATE_SUBTOTAL(state,action){
        const array = []
        state.cartItems.map((item) => {
            const {price, cartQuantity} = item;
            const cartItemAmount = price * cartQuantity;
            return array.push(cartItemAmount)
        })
        const totalAmount = array.reduce((a, b) => {
            return a + b;
        }, 0)
        state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QUANTITY(state,action){
        const array = []
        state.cartItems.map((item) => {
            const {cartQuantity} = item;
            const quantity = cartQuantity;
            return array.push(quantity)
        })
        const totalQuantity = array.reduce((a, b) => {
            return a + b;
        }, 0)
        state.cartTotalQuantity = totalQuantity
    },
    SAVE_URL(state, action){
        console.log(action.payload)
        state.previuosUrl = action.payload
    }
  }
});

export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, SAVE_URL} = cartSlice.actions
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousUrl = (state) => state.cart.previuosUrl;

export default cartSlice.reducer