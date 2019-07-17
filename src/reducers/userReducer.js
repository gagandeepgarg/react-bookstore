import { USER_LOGGED_IN, USER_LOGGED_OUT, RESENT_CONFIRM_MAIL } from '../types';

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case RESENT_CONFIRM_MAIL:
            return { ...state, confirmationMailResent: true };
        default: return state;
    }
}