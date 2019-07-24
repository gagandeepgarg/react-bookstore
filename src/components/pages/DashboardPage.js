import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AllBooksPage from '../pages/AllBooksPage';
import UserBooksPage from './UserBooksPage';
import HeaderPage from '../pages/HeaderPage';

const DashboardPage = ({ isConfirmed }) => (
    <div>
        <HeaderPage/>
        <br/>
        {!isConfirmed && <ConfirmEmailMessage />}
        
        {isConfirmed && <UserBooksPage />}
        <br/> <br/>
        {isConfirmed && <AllBooksPage />}
    </div>
);

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isConfirmed: !!state.user.confirmed
    }
}
export default connect(mapStateToProps)(DashboardPage);