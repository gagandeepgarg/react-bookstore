import axios from 'axios';

export default {
    user:{
        login : credentials =>
            axios.post('/api/auth', {credentials}).then(res=>res.data.user),
        signup: user =>
            axios.post('/api/users',{user}).then(res=>res.data.user),
        confirm: token =>
            axios.post('/api/auth/confirmation',{token}).then(res=>res.data.user),
        resendConfirmationLink: username =>
            axios.post('/api/users/resendConfirmationLink',{username}),
        resetPasswordRequest: email =>
            axios.post('/api/auth/resetPasswordRequest',{email}),
        validateResetPasswordToken: token =>
            axios.post('/api/auth/validateResetPasswordToken',{token}),
        resetPassword: data =>
            axios.post('/api/auth/resetPassword',{data})
    }
};