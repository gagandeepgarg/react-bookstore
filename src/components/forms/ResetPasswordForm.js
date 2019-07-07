import React from 'react';
import  PropTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends React.Component{
    state={
        data:{
            token:this.props.token,
            password:'',
            confirmPassword:''
        },
        loading:false,
        errors:{}
    }
    onChange= e=> this.setState({
        ...this.state,
        data:{...this.state.data,[e.target.name]: e.target.value}
    })
    onSubmit= e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length===0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
            .catch(err => this.setState({errors:err.response.data.errors, loading:false}))
        }
    }
    validate =(data)=>{
        const errors={};
        if(!data.password) errors.password = "Password is required";
        if(data.password !== data.confirmPassword) errors.confirmPassword = "Passwords must match";
        return errors;
    }
    render() {
        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                { errors && errors.global && <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                    </Message>}
                <Form.Field error={errors? !!errors.password:false}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter new password"
                    value={data.password} onChange={this.onChange} />
                </Form.Field>
                {errors.password && <InlineError text={errors.password} /> }
                <br/>
                <Form.Field error={errors? !!errors.confirmPassword:false}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Retype your new password"
                    value={data.confirmPassword} onChange={this.onChange} />
                </Form.Field>
                {errors.confirmPassword && <InlineError text={errors.confirmPassword} /> }
                <Button primary>Submit</Button>
            </Form>
        );
    }
}
ResetPasswordForm.propTypes= {
    submit :PropTypes.func.isRequired,
    token:PropTypes.string.isRequired
}

export default ResetPasswordForm;