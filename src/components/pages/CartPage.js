import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon, Grid, Input } from 'semantic-ui-react';
import { loadCartItems } from '../../actions/carts';
import HeaderPage from '../pages/HeaderPage';

class CartPage extends React.Component {
    state = {
        loading: true,
        success: false,
        userCart:[]
    }
    componentDidMount() {
        this.props.loadCartItems(this.props.user.username)
            .then((cart) => this.setState({userCart:cart, loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }))
    }
    onChange= (cartItem,quantity)=> {
        cartItem.quantity=quantity;
        this.setState({ userCart: this.state.userCart });
    }
    getCartTotal = ()=>{
        let total = 0;
        this.state.userCart.forEach(item => {
            total+= item.pricePerUnit * item.quantity;
        });
        return total;
    } 
    removeItem = (item)=>{
        this.state.userCart.splice(this.state.userCart.indexOf(item),1);
        this.setState({ userCart: this.state.userCart })
    }
    
    
    render() {
        const { loading, success, userCart } = this.state;
        return (
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
                                    <Grid.Column/>
                                </Grid.Row>
                            {userCart.map((cartItem) =>
                                <Grid.Row>
                                    <Grid.Column>
                                        {cartItem.bookName}    
                                    </Grid.Column>
                                    <Grid.Column>
                                        {cartItem.pricePerUnit}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Input type="number" min="1" max="10" className="quantity-field" placeholder='quantity..' value={cartItem.quantity}
                                            onChange={(e)=>{this.onChange(cartItem,e.target.value)}}/> 
                                    </Grid.Column>
                                    <Grid.Column>
                                        {cartItem.pricePerUnit * cartItem.quantity}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <i aria-hidden="true" title="Remove Item"
                                         className="trash alternate icon"  
                                         onClick={()=>this.removeItem(cartItem)} />
                                    </Grid.Column>
                                </Grid.Row>
                            )}
                                <Grid.Row>
                                        <Grid.Column/>
                                        <Grid.Column/>
                                        <Grid.Column/>
                                        <Grid.Column>
                                            Total:
                                        </Grid.Column>
                                        <Grid.Column>
                                        {this.getCartTotal()}
                                        </Grid.Column>
                                    </Grid.Row>
                            </Grid>
                        </div>
                    </div>)
                }

                {!loading && !success && (
                    <Message negative icon>
                        <Icon name="warning sign" />
                        <Message.Content>
                        <Message.Header>Oops!! Unbale to load Cart Items</Message.Header>
                            Please refresh the page or check back in sometime.
                        </Message.Content>
                    </Message>
                )}
            </div>
        );
    }
}

CartPage.propTypes = {
    user:PropTypes.shape({
        username:PropTypes.string.isRequired
    }).isRequired,
    loadCartItems:PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { loadCartItems })(CartPage);