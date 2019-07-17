import React from 'react';
import { connect } from 'react-redux';
import {Menu,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import * as authAction from '../../actions/auth';
import { loadCartItems } from '../../actions/carts';

class HeaderPage extends React.Component{

    componentDidMount() {
        this.props.loadCartItems(this.props.username)
        .then((cart) => console.log(cart));
    }
    handleClick = (e, { name })=> {
        if(name==='home'){
            this.props.history.push("/");
        } else if(name==='dashboard'){
            this.props.history.push("/dashboard");
        }
    }
    render(){
        return(
            <div>
                <Menu pointing>
                <Menu.Item name='home' value='home' onClick={this.handleClick} />
                {this.props.isLoggedIn && (
                    <Menu.Item name='dashboard' value='dashboard' onClick={this.handleClick} />
                )}
                <Menu.Menu position='right'>
                {!this.props.isLoggedIn &&
                    <Menu.Item>
                        <Link to="/login">Login</Link>
                        &nbsp;&nbsp;&nbsp; or&nbsp;&nbsp;&nbsp;
                        <Link to="/signup">Sign Up</Link> 
                    </Menu.Item> }
                    {this.props.isLoggedIn && (
                        <span>
                            <Link to="/cart"><Button  >My Cart({this.props.cartItemsCount})</Button></Link>
                            <Button onClick={()=>this.props.logout()} >Log Out</Button>
                        </span>)
                    }
                </Menu.Menu>
                </Menu>
            </div>
        );
    }
}
HeaderPage.defaultProps ={
    cartItemsCount:0
}

HeaderPage.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired,
    logout:PropTypes.func.isRequired,
    history : PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired,
    cartItemsCount:PropTypes.number,
    loadCartItems:PropTypes.func.isRequired,
    username:PropTypes.string.isRequired
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: !!state.user.token,
        username:state.user.username,
        cartItemsCount:state.cart.cartItemsCount
    }
}
export default connect(mapStateToProps,{ logout:authAction.logout,loadCartItems })(withRouter(HeaderPage));