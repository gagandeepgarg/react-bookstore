import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authAction from '../../actions/auth'


const HomePage=({isAuthenticated, logout}) => <div>
    <h1>Home Page</h1>
    {isAuthenticated? (<button onClick={()=>logout()} >Log Out</button>):
    ( <div><Link to="/login">Login</Link> or  <Link to="/signup">Sign Up</Link> </div>)}
</div>

HomePage.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}
const mapStateToProps= (state)=>{
    return{
        isAuthenticated:!!state.user.token,
    }
}
export default connect(mapStateToProps,{ logout:authAction.logout })(HomePage);