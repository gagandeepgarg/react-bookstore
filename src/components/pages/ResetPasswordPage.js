import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Message } from 'semantic-ui-react';
import {validateToken, resetPassword} from '../../actions/auth'
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component{
    state = {
        success :false,
        laoding:true
    }
    componentDidMount(){
        const token = this.props.match.params.token;
        this.props.validateToken(token)
        .then(()=> this.setState({laoding:false,success:true}))
        .catch(() => this.setState({laoding:false,success:false}));
    }
    submit= data =>
            this.props.resetPassword(data)
            .then(() => this.props.history.push("/login"))
            .catch(() => this.setState({laoding:false,success:false}));;
            

    render(){
        const {laoding,success} = this.state;
        const token = this.props.match.params.token;
        return(
            <div>
            {laoding  && <Message>Loading...</Message>}
            {!laoding && success && <ResetPasswordForm submit={this.submit} token={token}/> }
            {!laoding && !success && <Message>Invalid Token</Message>}
            </div>
        )
    }
}

ResetPasswordPage.propTypes={
    validateToken:PropTypes.func.isRequired,
    match: PropTypes.shape({
        params:PropTypes.shape({
            token:PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    history:PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired,
    resetPassword:PropTypes.func.isRequired
}
export default connect(null,{validateToken, resetPassword})(ResetPasswordPage);