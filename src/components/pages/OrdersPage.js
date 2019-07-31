import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Message, Icon, Grid,Button, Header, Modal } from 'semantic-ui-react';
import {loadUserOrdersData} from '../../actions/order';
import HeaderPage from '../pages/HeaderPage';

class OrdersPage extends React.Component{
    state = {
        loading: true,
        success: false,
        pageNumber :1,
        filesPerPage : 10,
        userOrders:[],
        modalOpen:false,
        selectedOrder:{}
    }
    componentDidMount() {
        this.props.loadUserOrdersData(this.state.pageNumber, this.state.filesPerPage,
            this.props.user.username)
            .then((orders) => this.setState({ userOrders:orders, loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }
    orderDetails = (order)=>{
        this.setState({modalOpen:true,selectedOrder:order});
    }
    handleClose =()=>{
        console.log('called');
        this.setState({modalOpen:false, selectedOrder:{}});
    }
    
    render() {
        const { loading, success, userOrders, modalOpen, selectedOrder } = this.state;
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
            <Modal
                open={modalOpen}
                onClose={this.handleClose}
                basic
                size='small'>
                <Header > 
                    <div className="width-100">OrderId: {selectedOrder._id}  
                        <span className="right-float">
                            Date:{new Date(selectedOrder.createdAt).toLocaleString()}
                        </span>
                    </div>
                    Total Order Price:  {selectedOrder.TotalOrderPrice}
                </Header>
                <Modal.Content>
                {selectedOrder.orderItems && <div className="container">
                            <Grid columns={5} divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        Bookname    
                                    </Grid.Column>
                                    <Grid.Column>
                                        Price PerItem
                                    </Grid.Column>
                                    <Grid.Column>
                                        Qunatity
                                    </Grid.Column>
                                    <Grid.Column>
                                        Total Price
                                    </Grid.Column>
                                </Grid.Row>
                            {selectedOrder.orderItems.map((cartItem) =>
                                <Grid.Row>
                                    <Grid.Column>
                                        {cartItem.bookName}    
                                    </Grid.Column>
                                    <Grid.Column>
                                        {cartItem.pricePerUnit}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {cartItem.quantity}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {cartItem.pricePerUnit * cartItem.quantity}
                                    </Grid.Column>
                                </Grid.Row>
                            )}
                            </Grid>
                        </div>}
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
                </Modal.Actions>
            </Modal>
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