import React from 'react';
import { connect } from 'react-redux';
import {Menu,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as authAction from '../../actions/auth';


class HeaderPage extends React.Component{
    handleClick = (e, { name })=> {
        if(name==='home'){
            // this.props.history.push("/");
        }
    }
    render(){
        return(
            <div>
                <Menu pointing>
                <Menu.Item name='home' value='home' onClick={this.handleClick} />
                <Menu.Menu position='right'>
                {!this.props.isLoggedIn &&
                    <Menu.Item>
                        <Link to="/login">Login</Link>
                        &nbsp;&nbsp;&nbsp; or&nbsp;&nbsp;&nbsp;
                        <Link to="/signup">Sign Up</Link> 
                    </Menu.Item> }
                    {this.props.isLoggedIn && (
                        <span>
                            <Button  >My Cart(0)</Button>
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
export default connect(mapStateToProps,{ logout:authAction.logout })(HeaderPage);