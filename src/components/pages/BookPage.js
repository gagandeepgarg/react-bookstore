import React from 'react';
import { connect } from 'react-redux';
import {Card,Image,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as cartAction from '../../actions/carts';

const BookPage = ({ book,userBook,username, addToCart }) => (
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/images/bookcovers/HarryPotter_SS.jpg' />
        <Card.Header>{book.bookName}</Card.Header>
        <Card.Meta>Author: {book.author}</Card.Meta>
        <Card.Description>
          <strong>Genre: </strong>{book.genres}
        </Card.Description>
      </Card.Content>
      {!userBook && (<Card.Content extra>
        <div className='ui buttons'>
          <Button basic color='green' onClick={()=>addToCart(book,username)}>
            Add To Cart
          </Button>
        </div>
      </Card.Content>)}
    </Card>
);

BookPage.propTypes = {
    book: PropTypes.shape({
        bookName:PropTypes.string.isRequired,
        author:PropTypes.string.isRequired,
        genres: PropTypes.string.isRequired
    }).isRequired,
    userBook:PropTypes.bool.isRequired,
    username:PropTypes.string.isRequired,
    addToCart:PropTypes.func.isRequired
}

const mapStateToProps = (state)=>{
  return{
    username:state.user.username
  }
};
export default connect(mapStateToProps,{addToCart:cartAction.addToCart})(BookPage);