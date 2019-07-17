import {UPDATE_CART_ITEMS_COUNT} from '../types'

export default function cart(state={},action={}){
    switch (action.type) {
        case UPDATE_CART_ITEMS_COUNT:
        {   const cartData= action.data;
            let count=0;
            if(cartData){
            cartData.forEach(item => {count+=item.quantity;});
            }
            return { ...state, cartItemsCount:count };
        }
        default: return state;
    }
}