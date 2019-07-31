import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', { credentials }).then(res => res.data.user),
        signup: user =>
            axios.post('/api/users', { user }).then(res => res.data.user),
        confirm: token =>
            axios.post('/api/auth/confirmation', { token }).then(res => res.data.user),
        resendConfirmationLink: username =>
            axios.post('/api/users/resendConfirmationLink', { username }),
        resetPasswordRequest: email =>
            axios.post('/api/auth/resetPasswordRequest', { email }),
        validateResetPasswordToken: token =>
            axios.post('/api/auth/validateResetPasswordToken', { token }),
        resetPassword: data =>
            axios.post('/api/auth/resetPassword', { data })
    },
    book: {
        loadBooksData: (pageNumber, filesPerPage) =>
            axios.get(`/api/books/getBooksData?pageNumber=${pageNumber}&filesPerPage=${filesPerPage}`),
        loadUserBooksData: (pageNumber, filesPerPage,username) =>
            axios.get(`/api/books/getUserBooksData?pageNumber=${pageNumber}&filesPerPage=${filesPerPage}&username=${username}`),
    },
    cart:{
        loadCartItems: (username) =>
            axios.get(`/api/carts/getUserCartItems?username=${username}`),
        addToCart:(book,username) =>
            axios.post(`/api/carts/addToCart`,{book,username}),
        updateCartItemQuantity:(cartItem) =>
            axios.post(`/api/carts/updateQuantity`,{cartItem}),
        removeItemFromCart:(cartItem) =>
            axios.post(`/api/carts/removeFromCart`,{cartItem}),
        checkout:(username) =>
            axios.post(`/api/carts/checkout`,{username})

    },
    order:{
        loadUserOrdersData: (pageNumber, filesPerPage,username) =>
            axios.get(`/api/orders/loadUserOrdersData?pageNumber=${pageNumber}&filesPerPage=${filesPerPage}&username=${username}`)
    }
}
