import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Message, Icon, Grid,Button } from 'semantic-ui-react';
import {loadUserOrdersData} from '../../actions/order';
import HeaderPage from '../pages/HeaderPage';

class OrdersPage extends React.Component{
    state = {
        loading: true,
        success: false,
        pageNumber :1,
        filesPerPage : 10,
        userOrders:[]
    }
    componentDidMount() {
        this.props.loadUserOrdersData(this.state.pageNumber, this.state.filesPerPage,
            this.props.user.username)
            .then((orders) => this.setState({ userOrders:orders, loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }
    orderDetails = (order)=>{
        console.log(order);
    }
    
    render() {
        const { loading, success, userOrders } = this.state;
        return(
            <div>
            <HeaderPage/>
            {loading && (
                <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Header>Loading...</Message.Header>
                </Message>
            )}

            {!loading && success && 
                (<div>
                    <div className="container">
                        <Grid columns={5} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    Order ID    
                                </Grid.Column>
                                <Grid.Column>
                                    Order Date
                                </Grid.Column>
                                <Grid.Column>
                                    Status
                                </Grid.Column>
                                <Grid.Column>
                                    Order Total Price
                                </Grid.Column>
                                <Grid.Column/>
                            </Grid.Row>
                        {userOrders.map((order) =>
                            <Grid.Row>
                                <Grid.Column>
                                    {order._id}    
                                </Grid.Column>
                                <Grid.Column>
                                    {new Date(order.createdAt).toLocaleString()}
                                </Grid.Column>
                                <Grid.Column>
                                    {order.Status}
                                </Grid.Column>
                                <Grid.Column>
                                    {order.TotalOrderPrice} 
                                </Grid.Column>
                                <Grid.Column>
                                    <Button primary onClick={()=>this.orderDetails(order)}>View Order Details</Button> 
                                </Grid.Column>
                                
                            </Grid.Row>
                        )}
                        </Grid>
                    </div>
                </div>)
            }

            {!loading && !success && (
                <Message negative icon>
                    <Icon name="warning sign" />
                    <Message.Content>
                    <Message.Header>Oops!! Unbale to load Your Orders</Message.Header>
                        Please refresh the page or check back in sometime.
                    </Message.Content>
                </Message>
            )}
        </div>
        )
    }
}

OrdersPage.propTypes={
    user:PropTypes.shape({
        username:PropTypes.string.isRequired
        }).isRequired,
    loadUserOrdersData:PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {user: state.user}
}
const mapDispatchToProps= {
    loadUserOrdersData
}
export default connect(mapStateToProps,mapDispatchToProps)(OrdersPage);