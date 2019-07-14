import React from 'react';
import { connect } from 'react-redux';
import {Menu,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import * as authAction from '../../actions/auth';


class HeaderPage extends React.Component{
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
                            <Link to="/cart"><Button  >My Cart(0)</Button></Link>
                            <Button onClick={()=>this.props.logout()} >Log Out</Button>
                        </span>)
                    }
                </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

HeaderPage.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired,
    logout:PropTypes.func.isRequired,
    history : PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: !!state.user.token
    }
}
export default connect(mapStateToProps,{ logout:authAction.logout })(withRouter(HeaderPage));