import api from "../api";

export const loadBooksData = (pageNumber, filesPerPage) => () =>
    api.book.loadBooksData(pageNumber,filesPerPage)
    .then(res=>res.data);

export const loadUserBooksData = (pageNumber, filesPerPage,username) => () =>
    api.book.loadUserBooksData(pageNumber,filesPerPage,username)
    .then(res=>res.data);
    



export const FetchBook = () => () => {
    api.book.loadBooksData()
};