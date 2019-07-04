import api from "../api";
import { userLoggedIn } from "./auth";
import { RESENT_CONFIRM_MAIL } from '../types'


export const resentConfirmation = () => ({
    type: RESENT_CONFIRM_MAIL
})
export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        localStorage.bookwormJWT = user.token;
        dispatch(userLoggedIn(user));
    }
    );

export const resendConfirmationLink = (username) => dispatch => {
    api.user.resendConfirmationLink(username)
        .then(() => {
            dispatch(resentConfirmation())
        })
};