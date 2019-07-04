import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';
import { resendConfirmationLink } from '../../actions/users';

class ConfirmationPage extends React.Component {
    state = {
        loading: true,
        success: false,
    }
    componentDidMount() {
        this.props.confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }))
    }
    render() {
        const { loading, success } = this.state;
        return (
            <div>
                <h1>Email confirmation</h1>
                {loading && (
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Header>Verifying your email</Message.Header>
                    </Message>
                )}

                {!loading && success && (
                    <Message success icon>
                        <Icon name="checkmark" />
                        <Message.Content>
                            <Message.Header>Email Verified. Thanks Verifying your email</Message.Header>
                            <Link to="/dashboard">Go to Home Page</Link>
                        </Message.Content>
                    </Message>
                )}

                {!loading && !success && (
                    <Message negative icon>
                        <Icon name="warning sign" />
                        <Message.Content>
                            <Message.Header>Oops!! Verification link is expired</Message.Header>
                            Dear {this.props.username},
                            {this.props.username && !this.props.confirmationMailResent && <Button onClick={() => this.props.resendConfirmationLink(this.props.username)}>
                                Resend confirmation Mail</Button>
                            }
                            {!this.props.username && <span>Invalid link for confirmation.
                                Please contact bookstore services at help@bookstore.com</span>
                            }
                            {this.props.confirmationMailResent && 
                            <span><br/>verifaction mail sent to your registered mail ID</span>}
                        </Message.Content>
                    </Message>
                )}
            </div>
        );
    }
}
ConfirmationPage.defaultProps = {
    username: '',
    confirmationMailResent: false
};
ConfirmationPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    confirm: PropTypes.func.isRequired,
    username: PropTypes.string,
    resendConfirmationLink: PropTypes.func.isRequired,
    confirmationMailResent: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        confirmationMailResent:state.user.confirmationMailResent
    }
}
export default connect(mapStateToProps, { confirm, resendConfirmationLink })(ConfirmationPage);