import {UPDATE_CART_ITEMS_COUNT} from '../types'
import api from "../api";

export const UpdateCartItemCount = data => ({
    type:UPDATE_CART_ITEMS_COUNT,
    data
})

export const loadUserOrdersData = (pageNumber, filesPerPage,username) => () =>
    api.order.loadUserOrdersData(pageNumber,filesPerPage,username)
    .then(res=>res.data);