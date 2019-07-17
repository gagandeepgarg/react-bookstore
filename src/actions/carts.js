import {UPDATE_CART_ITEMS_COUNT} from '../types'
import api from "../api";

export const UpdateCartItemCount = data => ({
    type:UPDATE_CART_ITEMS_COUNT,
    data
})

export const loadCartItems = (username) => (dispatch) =>
    api.cart.loadCartItems(username)
    .then(res=>{
        dispatch(UpdateCartItemCount(res.data));
        return res.data;
    });

export const addToCart = (book,username) =>  (dispatch) =>
    api.cart.addToCart(book,username)
    .then(res=>{
        dispatch(UpdateCartItemCount(res.data.cartItems));
        return res.data;
    });

export const updateCartItemQuantity = (cartItem) =>  (dispatch) =>
    api.cart.updateCartItemQuantity(cartItem)
    .then(res=>{
        dispatch(UpdateCartItemCount(res.data.cartItems));
        return res.data;
    });

export const removeItemFromCart = (cartItem) => (dispatch) =>
    api.cart.removeItemFromCart(cartItem)
    .then(res=>{
        dispatch(UpdateCartItemCount(res.data.cartItems));
        return res.data;
    });