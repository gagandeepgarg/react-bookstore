import api from "../api";

export const loadCartItems = (username) => () =>
    api.cart.loadCartItems(username)
    .then(res=>res.data);

export const cart = () => () => {
    api.book.loadBooksData()
};