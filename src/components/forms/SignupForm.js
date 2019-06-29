import React from 'react';
import  PropTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component{
    state={
        data:{
            username:'',
            password:''
        },
        loading:false,
        errors:{}
    }
    onChange= e=> this.setState({
        data:{...this.state.data,[e.target.name]: e.target.value}
    })
    onSubmit= ()=>{
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
        if(!data.username) errors.username = "Username is required";
        if(!data.password) errors.password = "Password is required";
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
                <Form.Field error={errors? !!errors.username:false}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter Username"
                    value={data.username} onChange={this.onChange} />
                </Form.Field>
                {errors.username && <InlineError text={errors.username} /> }
                <Form.Field error={errors? !!errors.password:false}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="password"
                    value={data.password} onChange={this.onChange} />
                </Form.Field>
                {errors.password && <InlineError text={errors.password} /> }
                <Button primary>Sign Up</Button>
            </Form>
        );
    }
}

SignupForm.propTypes ={
    submit: PropTypes.func.isRequired
}
export default SignupForm;